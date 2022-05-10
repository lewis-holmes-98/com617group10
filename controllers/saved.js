const User = require("../models/User");
const Resort = require("../models/Resort");

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({_id: user.id});
      const savedResorts = await Resort.find({
          _id: {$in: userRef.saved}});
      res.render('saved', {resorts: savedResorts});
    } catch (e) {
      console.log(e);
      res.json({result: 'No saves - saved.js'}); 
    }
}