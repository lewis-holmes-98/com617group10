import json
import requests
from datetime import datetime, timedelta
import pandas as pd
import numpy as np


def get_historical_data(request_location,
                        api_key,
                        start_date="2019-02-25",
                        loop_end = "2022-01-15", 
                        request_counter_start = 0):
    '''Get data from the world weather online API. API returns chunks of 35 days at a time, so this code repeats requests
    until all dates from start date to loop end are included. Loop end is not the final date, only the last guaranteed date in the data.
    ensure that this date is not close to the current date as this will cause issues.
    
    Data is returned in 12 hour increments as per the url ending. This suits our needs but can be edited if relevant.
    
    Note that the request location should in in the format that will append to the request string. Sometimes this will be a lat long in the case that worldweatheronline does not recognise the city name.'''
    request_string = request_location
    start_date = datetime.strptime(start_date,"%Y-%m-%d")
    datecounter = start_date
    all_weather = []
    counter = request_counter_start
    print("Definitely run this? Y to proceed")
    userin = input()
    if userin != "Y":
        print("Aborted.")
        return ""
    while datecounter < datetime.strptime(loop_end,"%Y-%m-%d"):
        end_date = datecounter + timedelta(days=34)
        timestring = datetime.strftime(datecounter,format="%Y-%m-%d")
        timestring2 = datetime.strftime(end_date,format="%Y-%m-%d")
        url = f"http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key={api_key}&q={request_string}&format=json&date={timestring}&enddate={timestring2}&tp=12"
        response = requests.get(url)
        dictr = response.json()
        all_weather += dictr["data"]["weather"]
        
        datecounter = datecounter + timedelta(days=35)
        counter += 1
    print("count of requests:\t",counter)
    return all_weather


def list_resort_names():
    return ["brides_les_bains",
            "courchevel",
            "les_menuires",
            "meribel",
            "orelle",
            "saint_martin",
            "val_thorens"]


def read_historical_json(foldername,filename):
    '''read a json of historical data.'''
    filepath = f"../data/{foldername}/{filename}.json"
    with open(filepath) as json_in:
        dictionary = json.load(json_in)
    return dictionary


def create_daily_summary_table(json):
    '''Normalise raw API data and process to keep only relevant columns. 
    Returns a Pandas dataframe.'''
    df = pd.json_normalize(data = json,
                          record_path=["hourly"],
                          meta = ["date","maxtempC","mintempC","avgtempC","totalSnow_cm","sunHour","uvIndex"],
                          record_prefix="hourly",
                          errors="ignore")
    df["hourlyDesc"] = ""
    for i, row in enumerate(df.iterrows()):
        df["hourlyDesc"][i] = df["hourlyweatherDesc"][i][0]["value"]
    df = df.drop(["hourlyweatherIconUrl","hourlytempF","hourlywindspeedMiles","hourlyDewPointF","hourlyHeatIndexF","hourlyWindChillF",
                  "hourlypressureInches","hourlyprecipInches",
                    "hourlywinddir16Point","hourlyweatherCode","hourlyFeelsLikeF","hourlyFeelsLikeC","hourlyweatherDesc",
                 "hourlytempC","hourlywinddirDegree","hourlyhumidity","hourlypressure",
       "hourlyHeatIndexC","hourlyWindGustMiles","hourlyDewPointC","mintempC","maxtempC","hourlyWindChillC",
       "hourlyuvIndex","hourlyprecipMM","hourlyvisibility","hourlycloudcover","hourlyWindGustKmph"],axis=1)
    return df


def open_weather_jsons():
    '''Processes raw API data, completes feature extraction and processing steps. 
    Returns a list of Pandas dataframes.'''
    resort_names = list_resort_names()
    resort_weather_data = [] 
    for resort in resort_names:
        table = create_daily_summary_table(read_historical_json(resort,"fulldata"))
        
        # filter data for midday
        table["date"] = pd.to_datetime(table["date"])
        remove_leap_day = datetime.strptime("2020-02-29","%Y-%m-%d")
        table = table[table["date"] != remove_leap_day]
        table = table[table["hourlytime"] == "1200"]
        table = table.sort_values("date")

        # add a day of year value without the evil leap day
        table['day'] = table.date.dt.strftime('%m-%d')
        table['day'] = table['day'] + "-1900"
        table['day'] = pd.to_datetime(table["day"],format="%m-%d-%Y")
        table["dayofyear"] = table["day"].dt.dayofyear
        table = table.drop("day",axis=1)

        # feature engineer weather column
        table["rain"] = table["hourlyDesc"].str.contains('rain|drizzle')
        table["sleet"] = table["hourlyDesc"].str.contains("sleet")
        table["snow"] = table["hourlyDesc"].str.contains("snow")
        table["snow"] = table["hourlyDesc"].str.contains("snow")
        table["fog"] = table["hourlyDesc"].str.contains("fog|mist")

        # add table to list
        resort_weather_data.append(table)
        
    return resort_weather_data


def running_mean(list_in,N):
    '''Creates a forward moving average from a list.'''
    averages = []
    list_len = len(list_in)
    list_in = list_in + list_in[0:(N-1)]
    for i in range(list_len):
        averages.append(np.mean(list_in[i:(i+N)]))
    return averages 


def create_score_from_uv(column,upper_limit):
    '''Function to implement UV score algorithm.'''
    col = column.tolist()
    score_list = []
    for item in col:
        if item > upper_limit:
            score_list.append(-1)
        else:
            score_list.append(-(1/(2)**7)*(2**item)+0.25)
    return [float(score) for score in score_list]


def create_score_from_temp(column,upper_limit,lower_limit,middle_limit):
    '''Function to implement temperature score algorithm.'''
    col = column.tolist()
    score_list = []
    for item in col:
        if item > upper_limit:
            score_list.append(2**(-2*(item+1)) - 1)
        elif (item > middle_limit) & (None != middle_limit):
            score_list.append(1)
        elif item >= lower_limit:
            score_list.append((item+14)**0.5-1)
        else:
            score_list.append(-1)
    return [float(score) for score in score_list]
    
    
def create_score_from_snow(column,upper_limit,lower_limit,rolling_day_length = 7):
    '''Function to implement snow score algorithm.
     Give this function snow_ma column
    '''
    max_snow = column.max()
    snow_prop_max = column / max_snow
    
    
    score_list = []
    
    for item in snow_prop_max:
        score_list.append(2**(9*(item-0.88))-1)
    # create a list of rank
#     array = np.array(mean_ahead_snow)
#     temp = array.argsort()
#     ranks = np.empty_like(temp)
#     ranks[temp] = np.arange(len(array))
    
#     ranks = list(ranks/365)
#     for item in ranks:
#         score_list.append(2**(8*(item - 0.88)) - 1)
#         #score_list.append(2/(1+(2.71828182846)**(-10*(item-0.5)))-1) # alternative, closer to linear
    return [float(score) for score in score_list]


def create_score_from_supplementary_column(column,minimum_value=0.5,punishment_factor=-1):
    '''Function to assign scores for supplementary columns.'''
    col = column.tolist()
    score_list = []
    for item in col:
        if item > minimum_value:
            score_list.append(punishment_factor)
        else:
            score_list.append(0)
            
    return [float(score) for score in score_list]


def process_resort_data(resort):
    '''Process resort data to include a daily score.'''
    resort["hourlytime"] = pd.to_numeric(resort["hourlytime"])
    resort["avgtempC"] = pd.to_numeric(resort["avgtempC"])
    resort["totalSnow_cm"] = pd.to_numeric(resort["totalSnow_cm"])
    resort["uvIndex"] = pd.to_numeric(resort["uvIndex"])
    
    # group resort data by day of year and find mean
    resort_grouped = resort.groupby("dayofyear").agg(["mean","count"])
    resort_grouped.columns = ["_".join(a) for a in resort_grouped.columns.to_flat_index()]

    # create a snow 7-day moving average column
    resort_grouped["snow_ma"] = running_mean(resort_grouped["totalSnow_cm_mean"].tolist(),10)
    
    # create an empty score column
    resort_grouped["score"] = 0
    
    # create lists of scores based on input columns
    uv_score=create_score_from_uv(resort_grouped['uvIndex_mean'],upper_limit=7)
    temp_score=create_score_from_temp(resort_grouped['avgtempC_mean'],upper_limit=-1.5,lower_limit=-14,middle_limit=-10)
    snow_score=create_score_from_snow(resort_grouped["totalSnow_cm_mean"],upper_limit=30,lower_limit=10,rolling_day_length=10)
    rain = create_score_from_supplementary_column(resort_grouped['rain_mean'],)
    sleet = create_score_from_supplementary_column(resort_grouped['sleet_mean'],)
    fog = create_score_from_supplementary_column(resort_grouped['fog_mean'],punishment_factor=-0.5)
    
    # combine score lists
    resort_grouped["score"] = [sum(x) for x in zip(uv_score,temp_score,snow_score,rain,sleet,fog)]
    
    return resort_grouped