const db= require("../models/index");
const userService= require("../services/user");

const getUsers = async (req, res) => {
  try {
    const users = await userService.allUsers();

    if (users.length > 0) {
      
      await Promise.all(
        users.map(async (user) => {
          const section = await userService.findSectionById(user.section_id);
          user.section = section.name; 
        })
      );
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


const addUser=  async (req, res)=>{
    console.log(req.body);
      const {name, email, addresses,payments,qualification, section}= req.body;
      let address= addresses;
      let payment= payments;
      if(Array.isArray(addresses)==false){
        address=addresses.split();
        
      }
      if(Array.isArray(payments)==false){
        payment= payments.split();
   
      }
      const sec = await userService.createSection(section);
      const user= await userService.createUser({name,email, profile_pic:req.profile_pic,qualification, section_id:sec.id});
  
      address.map(async e=>{
          await userService.createAddress({name:e, user_id:user.id});
      });
  
      payment.map(async e=>{
        const payment1=  await userService.createPayment({
              name:e,
              user_id:user.id
          });
  
          await user.addPayment(payment1);
      });

      const users= await userService.allUsers();
  
      res.send({"message":"user created", "users":users});
  
  };

  const deleteUser=  async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      await db.Address.destroy({ where: { 
        user_id: userId} });
  
      await user.destroy();

      const users= await userService.allUsers();
  
      res.send({ message: "User deleted successfully" , "users":users});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred while deleting the user" });
    }
  };

  const editUser=async (req, res) => {
    const userId = req.params.id;
    console.log(req.body);
    const { name, email, addresses, payments, qualification, section } = req.body;
    let address = addresses;
    let payment = payments;
  
    if (Array.isArray(addresses) == false) {
      address = addresses.split();
    }
    if (Array.isArray(payments) == false) {
      payment = payments.split();
    }
  
    try {
   
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      user.name = name;
      user.email = email;
      user.qualification = qualification;
      if (req.profile_pic) {
        user.profile_pic = req.profile_pic;
      }
  
      const sec = await db.Section.findOrCreate({ where: { name: section } });
      user.section_id = sec[0].id;
  
      await user.save();
  
      await db.Address.destroy({ where: { user_id: userId } });
      address.map(async e => {
        await db.Address.create({ name: e, user_id: user.id });
      });
  
      await db.UserPayment.destroy({ where: { user_id: userId } });
      payment.map(async e => {
        const payment1 = await db.Payment.create({
          name: e,
          user_id: user.id
        });
  
        await user.addPayment(payment1);
      });

      const users= await userService.allUsers();
  
      res.send({ message: "User updated successfully", "users":users});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred while updating the user" });
    }
  };

  module.exports={getUsers, addUser,editUser,deleteUser};