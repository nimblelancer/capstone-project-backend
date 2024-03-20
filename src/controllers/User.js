const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Tạo người dùng mới
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

// Cập nhật người dùng
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

// Xóa người dùng theo ID
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

// Tìm kiếm người dùng theo ID
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

// Tìm tất cả người dùng
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("healthRecordId").exec();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Đăng ký người dùng mới
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Tạo người dùng mới
    user = new User({
      username,
      email,
      password: hashedPassword,
      roleId: 1, // roleId mặc định là 1
    });
    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();
    // Tạo và trả về token cho người dùng
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Đặt cookie chứa token
    res.cookie('token', token, { httpOnly: true }); // Cờ HttpOnly ngăn chặn JavaScript phía máy khách truy cập vào cookie

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập người dùng
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Đặt cookie chứa token
    res.cookie('token', token, { httpOnly: true });

    // Gửi phản hồi chỉ một lần
    res.status(200).json({ user });
  } catch (error) {
    console.error(error); // Log lỗi ra console
    res.status(500).json({ message: 'An error occurred while signing in' }); // Gửi phản hồi lỗi
  }
};

// Đăng xuất người dùng
exports.logout = async (req, res) => {
  // Xóa cookie chứa token
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
