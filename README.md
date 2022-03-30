# com617group10
## Seeder
Seeds using data from the /data folder.

Predictions made using the score column in the data.

<img src="/img/example_prediction.png" width="300"> 
<img src="/img/example_prediction2.png" width="300"> 

# Setup
1. `npm install`
2. `npm run seed` (use `npm run seedProduction` for production database)


# Using mongodb to store images
>The standard here is to use a tool like S3 or Azure Object Store to store all of the binary data. You eventually want to serve this stuff off a CDN somewhere, not from the DB.

TODO: Find max snow, estimate position in list
TODO: include recalc of rolling average for score

TODO: Calc best 6 week window every day
TODO: update score every day
TODO: create some default admin users
