const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, oneOf, validationResult } = require("express-validator");
const bcrytp = require("bcryptjs");

const User = require("../../models/User");

// @route POST api/users
// @desc Test route
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    // Make sure user is a Player or a Team
    oneOf(
      [check("role").equals("Player"), check("role").equals("Team")],
      "Are you a Player or a Team?"
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      // See if user exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists " }] });
      }

      user = new User({
        name,
        email,
        password,
        role,
      });

      // Encrypt password
      const salt = await bcrytp.genSalt(10);

      user.password = await bcrytp.hash(password, salt);

      // Save user
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {}
  }
);

module.exports = router;
