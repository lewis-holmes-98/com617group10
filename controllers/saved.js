const User = require("../models/User");
const Resort = require("../models/Resort");

// List all resorts saved by user.
exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({_id: user.id});

      // Find resorts saved by user.
      const savedResorts = await Resort.find({
          _id: {$in: userRef.saved}});

      res.render('saved', {resorts: savedResorts});
    } catch (e) {
      console.log(e);
      res.json({result: 'No saves - saved.js'}); 
    }
}

// Remove saved resort from saved list.
exports.unsave = async (req, res) => {
  try {
      const resortId = req.params.id;
      const userId = req.session.userID;

      // update user to remove resort
      await User.updateOne(
      { _id:userId}, {
          $pull: {
          saved: resortId
          }
      });

      // Return user saves again to rerender saved page
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