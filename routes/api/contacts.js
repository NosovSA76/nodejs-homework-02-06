const express = require('express');


const router = express.Router();
const contactsController  = require('../../controllers/contacts');
const {validateBody, isValidId, authenticate} = require("../../middlewares/index");
const  { schemas }  = require("../../models/contacts");


router.get('/', authenticate, contactsController.getAll);

router.get('/:contactId', authenticate, isValidId, contactsController.getById);

router.post('/',authenticate, validateBody(
    schemas.addSchema), contactsController.add);

router.put('/:contactId',authenticate, isValidId, validateBody(
    schemas.addSchema), contactsController.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(
    schemas.updateFavoriteSchema), contactsController.updateFavorite);

router.delete("/:contactId",authenticate, isValidId, contactsController.deleteById);



module.exports = router;
