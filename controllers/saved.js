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


exports.unsave = async (req, res) => {
  try {
      const resortId = req.params.id;
      const userId = req.session.userID;

      await User.updateOne(
      { _id:userId}, {
          $pull: {
          saved: resortId
          }
      });

      const userRef = await User.findOne({_id: userId});
      const savedResorts = await Resort.find({
          _id: {$in: userRef.saved}});
      res.render('saved', {resorts: savedResorts});

  } catch (e) {
      res.status(404).send({
      message: `Cannot leave -  error ${id}.`,
      });
  }
};