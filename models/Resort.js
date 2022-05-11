const mongoose = require("mongoose");
const { Schema } = mongoose;

const resortSchema = new Schema(
    {
        name: {type:String},
        formattedName: {type:String, unique: true}, // What we show to user  
        lat: {type:Number},
        long: {type:Number}
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Resort", resortSchema);