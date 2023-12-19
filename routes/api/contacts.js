const express = require('express');
const contactsController  = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', validateBody(schemas.addSchema), contactsController.add);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), contactsController.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateFavorite);

router.delete('/:contactId', isValidId, contactsController.deleteById);

module.exports = router;
