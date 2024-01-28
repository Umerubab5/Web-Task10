import express from "express";



import { createUser,getUsers,getUser,deleteUsers,updateUser} from "../controllers/users.js";


const router=express.Router();


 

router.get('/',getUsers);




router.post('/',createUser);

// /user/2=>req.params{id:2}

router.get('/:id',getUser);

router.delete('/:id',deleteUsers);

  router.patch('/:id',updateUser);

export default router;