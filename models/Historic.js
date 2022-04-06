const mongoose = require("mongoose");
const { Schema } = mongoose;

const historicSchema = new Schema(
    {
        dayofyear: {type:String},
        name: {type:String},
        hourlytime_mean: {type: Number},
        avgtempC_mean: {type: Number},
        totalSnow_cm_mean: {type: Number},
        uvIndex_mean: {type: Number},
        rain_mean: {type: Number},
        sleet_mean: {type: Number},
        snow_mean: {type: Number},
        fog_mean: {type: Number},
        score: {type: Number},
        count: {type: Number},
        resort: {type:String},
        resort_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resort"
        },
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Historic", historicSchema);