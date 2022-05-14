const mongoose = require("mongoose");
const { Schema } = mongoose;

const historicSchema = new Schema(
    {
        dayofyear: {type:Number},
        hourlytime_mean: {type: Number},
        avgtempC_mean: {type: Number},
        totalSnow_cm_mean: {type: Number},
        uvIndex_mean: {type: Number},
        rain_mean: {type: Number},
        sleet_mean: {type: Number},
        snow_mean: {type: Number},
        fog_mean: {type: Number},
        snow_ma: {type: Number},
        score: {type: Number},
        count: {type: Number},
        resort: {type:String},
        forwardscore:{type: Number},
        resort_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resort"
        },
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Historic", historicSchema);