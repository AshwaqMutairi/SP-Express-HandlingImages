const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    firstName: { type: String },
    lastName: { type: String },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("User", UserSchema);
