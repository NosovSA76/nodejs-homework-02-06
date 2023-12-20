const { Contact } = require('../../models/contacts');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    throw HttpError(400, 'missing fields');
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateById);
