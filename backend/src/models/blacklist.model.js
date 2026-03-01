const mongoose = require("mongoose");

const blackListSchema = new mongooseSchema(
  {
    token: {
      type: String,
      required: [true, "token is required for blacklisting"],
    },
  },
  {
    timestamps: true,
  },
);

const blackListModel = mongoose.model("blacklist", blackListSchema);

module.exports = blackListModel;
