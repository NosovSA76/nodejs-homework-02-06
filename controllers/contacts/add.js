const { Contact } = require('../../models/contacts');
const { ctrlWrapper } = require('../../helpers');

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
