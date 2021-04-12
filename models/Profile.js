const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  location: {
    type: String,
    required: true,
  },

  img: {
    type: String,
  },

  bio: {
    type: String,
  },

  team: {
    grades: {
      type: [String],
    },
    league: {
      type: String,
    },
    coach: {
      type: String,
    },
    website: {
      type: String,
    },
    players: {
      type: [String],
    },
  },

  player: {
    position: {
      type: String,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    playsfor: {
      type: String,
    },

    experience: [
      {
        team: {
          type: String,
          required: true,
        },
        grade: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
