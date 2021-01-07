const userController=require("../app/routes/userapi");
const express = require("express");
const router = express.Router();

router.post("/create-user",userController.postCreateUser);
router.put("/update/:_id",userController.putUpdateUser);
router.get("/getall",userController.getAllUser);
router.get("/getbyname/:_name",userController.getUserbyName);
router.get("/getuser/:_id",userController.getUser);
router.delete("/deleteuser/:_id",userController.deleteUser);
router.post("/detele",userController.postDelUser);

module.exports=router;