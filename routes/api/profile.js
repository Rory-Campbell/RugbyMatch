const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const upload = require("../../services/upload");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Image = require("../../models/Images");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "role"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Post api/profile
// @desc Create or update user profile
// @access Private

router.post(
  "/",
  [auth, [check("location", "Location is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      bio,
      img,
      location,
      position,
      height,
      weight,
      playsfor,
      grades,
      coach,
      league,
      website,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (img) profileFields.img = img;
    if (bio) profileFields.bio = bio;

    //Build player object
    profileFields.player = {};
    if (position) profileFields.player.position = position;
    if (height) profileFields.player.height = height;
    if (weight) profileFields.player.weight = weight;
    if (playsfor) profileFields.player.playsfor = playsfor;

    //Build team object
    profileFields.team = {};
    if (grades) {
      profileFields.team.grades = grades
        .split(",")
        .map((grade) => grade.trim());
    }
    if (coach) profileFields.team.coach = coach;
    if (league) profileFields.team.league = league;
    if (website) profileFields.team.website = website;

    try {
      let profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        "role"
      );

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile
// @desc Get all team profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "role"]);
    let teams = [];
    for (i = 0; i < profiles.length; i++)
      if (profiles[i].user.role === "Team") teams.push(profiles[i]);
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/players
// @desc If logged in user is a team get all player profiles
// @access Private

router.get("/players", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select("-password");
    const profiles = await Profile.find().populate("user", ["name", "role"]);
    let players = [];
    //Check if current user is a Team
    if (currentUser.role != "Team") {
      return res.status(400).send("Invalid credentials");
    }
    // if current user is a Team show Get player profiles
    for (i = 0; i < profiles.length; i++)
      if (profiles[i].user.role === "Player") players.push(profiles[i]);
    return res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "role"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    if (profile.user.role != "Team")
      return res
        .status(400)
        .json({ msg: "Only registered teams can view player profiles" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/user/:user_id
// @desc Get player profile by user id
// @access Private

router.get("/player/:user_id", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "role"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    if (currentUser.role != "Team" && currentUser._id != req.params.user_id)
      return res
        .status(400)
        .json({ msg: "Only registered teams can view player profiles" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/image
// @desc Get profile picture of user
// @access Private

router.get("/image/:user_id", auth, async (req, res) => {
  try {
    const image = await Image.findOne({ user: req.params.user_id });

    if (!image)
      return res.status(400).json({ msg: "There is no profile for this user" });

    return res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// try {
//   let profile = await Profile.findOne({ user: req.user.id }).populate(
//     "user",
//     "role"
//   );

//   if (profile) {
//     //Update
//     profile = await Profile.findOneAndUpdate(
//       { user: req.user.id },
//       { $set: profileFields },
//       { new: true }
//     );

//     return res.json(profile);
//   }

//   //Create
//   profile = new Profile(profileFields);

//   await profile.save();
//   res.json(profile);

// @route POST api/profile/upload
// @desc Upload profile picture
// @access Private

router.post("/upload", auth, upload.single("picture"), async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate("user");
    if (req.file && req.file.path) {
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { img: req.file.path } }
        );
        return res.json(profile);
      }

      await profile.save();

      return res.status(200).json({ msg: "Profile picture added" });
    } else {
      console.log(req.file);
      return res.status(422).json({ error: "invalid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile
// @desc Delete profile and user
// @access Private

router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add player experience
// @access  Private

router.put(
  "/experience",
  [
    auth,
    [
      check("team", "Team is required").not().isEmpty(),
      check("grade", "Grade is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { team, grade, location, from, to, current } = req.body;

    const newExp = {
      team,
      grade,
      location,
      from,
      to,
      current,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.player.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Delete api/player/experience/:exp_id
// @desc    Delete profile experience
// @access  Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index

    const removeIndex = profile.player.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.player.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
