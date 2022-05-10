const mongoose = require("mongoose");
const { Schema } = mongoose;

const resortSchema = new Schema(
    {
        name: {type:String},
        formattedName: {type:String, unique: true}, // What we show to user  
        bestWeekWindow: {type:String}
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Resort", resortSchema);