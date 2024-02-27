const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { username, email, password, avatarImage, isVipAccount, roleId } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      avatarImage,
      isVipAccount,
      roleId,
    });

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).send({
        message: `Cannot update User with id=${id}`,
      });
    }
    res.send({ message: "User was updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndRemove(id, {
      useFindAndModify: false,
    });

    if (!data) {
      return res.status(404).json({ error: "User not found to delete" });
    }

    res.status(200).json({ message: "Delete User successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id).populate("healthRecordId").exec();

    if (!data) {
      return res.status(404).send({
        message: `Cannot Find User with id=${id}`,
      });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("healthRecordId").exec();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
