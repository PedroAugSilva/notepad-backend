const { Router } = require('express')
const router = Router();
const { deleteUser, listUser, signIn, signUp, updateUser } = require('../controller/userController');

router.get('/users', listUser);
router.get('/user', signIn);
router.post('/user', signUp);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = router;
