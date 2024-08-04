const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

//registration
router.post('/api/registration', authController.register);
//login
router.post('/api/login', authController.login);
//admin registration
 router.post('/api/adminRegistration', authController.adminRegistration);
 //users List
 router.get('/api/usersList', authController.usersList);
 //delete user
 router.delete('/api/deleteUser/:id', authController.deleteUser);
 //update user Role
 router.put('/api/updateUserRole/:userId', authController.updateUserRole);
 //username and role
 router.get('/api/UserNameAndRole/:userId', authController.UserNameAndRole);
module.exports = router;