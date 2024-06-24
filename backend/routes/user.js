const express= require("express");
const { getUsers, addUser, deleteUser, editUser } = require("../controllers/user");
const { uploadMiddleware } = require("../middleware/multer");

const router= express.Router();

router.get("/getUsers",getUsers);
router.post("/addUser",uploadMiddleware, addUser);
router.delete("/deleteUser/:id",deleteUser);
router.put("/editUser/:id",uploadMiddleware, editUser);

module.exports=router;