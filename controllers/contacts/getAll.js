const { Contact } = require('../../models/contacts');
const { HttpError, ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

module.exports = ctrlWrapper(getAll);
