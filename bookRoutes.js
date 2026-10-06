import express from 'express';
import { createUsers, deleteUser, editUser, getSingleUser, getUsers } from './controllers/requests.js';

const router = express.Router()

router.get('/melvingreatbooks', getUsers);

router.get('/melvingreatbooks/:id', getSingleUser)

router.put('/melvingreatbooks/:id', editUser);

router.post('/melvingreatbooks', createUsers);

router.delete('/melvingreatbooks/:id', deleteUser);

export default router