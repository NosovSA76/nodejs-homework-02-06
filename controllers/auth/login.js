const bcrypt = require("bcryptjs");
const { User } = require("../../models/users");
const {HttpError, ctrlWrapper} = require("../../helpers/index");
const jwt = require("jsonwebtoken");


const {SECRET_KEY} = process.env;


const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).exec();
  
      if (!user) throw HttpError(401, 'Email or password is wrong');
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) throw HttpError(401, 'Email or password is wrong');
  
      const payload = {
        id: user._id,
      };
  
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  

      await User.findByIdAndUpdate(user._id, { token });
  
      res.status(200).json({
        token,
        user: { email: user.email, subscription: user.subscription },
        avatarURL: user.avatarURL,
      });
    } catch (error) {
      next(error);
    }
  };


module.exports = {
    login: ctrlWrapper(login),
};