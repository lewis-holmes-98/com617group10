const User = require("../../models/User");

exports.create = async (req, res) => {
      const resortId = req.body.id;
      console.log(resortId);
      if ( !(resortId) || req.session.userID) {
        res.json({result: 'error'});
      }
      try {
        await User.updateOne({"_id": req.session.userID}, {$addToSet:{saved: resortId}})
      } catch (e) {
        res.json({result: 'save failed'});
      }
  }