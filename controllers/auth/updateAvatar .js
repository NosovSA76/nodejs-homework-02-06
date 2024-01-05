
const path = require("path")
const avatarsDir = path.resolve('public/avatars');
const { ctrlWrapper} = require("../../helpers/index");
const { User } = require("../../models/users");
const  fs = require('node:fs/promises')

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.json({
    avatarUrl,
  });
};

  module.exports = {uploadAvatar: ctrlWrapper(uploadAvatar)}