const db= require("../models/index");
class UserServices{

    allUsers=async ()=>{
       const users= await db.User.findAll({
        include: [
          {
            model: db.Address,  
            // as: 'Addresses',    
          },
          {
            model: db.Payment,
            // as:'Payments',

          }
        ]
      });

          return users;
    }

    findSectionById=async (id)=>{
        const section= await db.Section.findByPk(id);
        return section;
    }

    createSection=async(section)=>{
      const sec=  await db.Section.create({name:section});
      return sec;
    }

    createUser= async ({name,email,profile_pic,qualification,section_id})=>{
        const user= await db.User.create({name:name, email:email, profile_pic:profile_pic, qualification:qualification, section_id:section_id});
        return user;
    }

    createAddress=async ({name,user_id})=>{
       const address=await db.Address.create({name:name, user_id:user_id});
       return address;
    }

    createPayment= async ({name, user_id})=>{
        const payment=  await db.Payment.create({
            name:name,
            user_id:user_id
        });
        return payment;
    }

}

module.exports= new UserServices();