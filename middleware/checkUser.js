const userModel = require("../models/User");
const { validationResult } = require("express-validator");

module.exports = {
  async checkRegistration(req, res, next) {
    try {
      console.log("in check registration");
      const errors = validationResult(req);
      console.log("errors",errors.array());
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const { visitorId, info, meetingWith, phone } = req.body;
      

    } catch (err) {
        return res.status(500).send({
            error:err.message
        })
    }
  },
};
