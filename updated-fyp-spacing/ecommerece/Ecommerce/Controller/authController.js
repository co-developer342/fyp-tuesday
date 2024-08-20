import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import orderModel from '../models/OrderModel.js'

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,question } = req.body;

    // Validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!question) {
      return res.send({ message: "Question is Required" });
    }

    // Check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      question
    });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Token
    const token = await jsonwebtoken.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Test Controller
export const testController = async (req, res) => {
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}; 

// Forgot Password Controller
export const forgotPasswordController= async (req,res)=>{

try {
  const {email,question,newPassword}=req.body;
  if(!email){
    res.status(400).send({msg:"Email is required"})
  }
  if(!question){
    res.status(400).send({msg:"Question is required"})
  }
  if(!newPassword){
    res.status(400).send({msg:"New Password is required"})
  }
const user= await userModel.findOne({email,question})
if(!user){
  res.status(404).send({
    success:false,
    message:"Wrong Email or Answer"

  })
}
const hashed=await hashPassword(newPassword)
await userModel.findByIdAndUpdate(user._id,{password:hashed});
res.status(200).send({
  success:true,
  message:"Password Reset Successfully"
})

} catch (error) {
  console.log(error)
  res.status(404).send({
    success:false,
    message:'Something went wong',
    error
  })
}

}

export const updateProfileController=async(req,res)=>{
  try {
    const {name,email,password,address,phone}=req.body
    const user=await userModel.findById(req.user.id)

    if(password && password.length <6 ){
      return res.json({error:'Password is required and 6 character long'})
    }
    const hashedPassword=password? await hashPassword(password): undefined
    const updateUser=await userModel.findByIdAndUpdate(req.user._id,{
      name:name || user.name,
      password:hashedPassword || user.password,
      phone:phone || user.phone,
      email:email || user.email,
      address:address || user.address
    },{new:true})
    res.status(200).send({
      success:true,
      message:'Profile Updated Succesfully',
      updateUser
    })
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success:false,
      message:'Error while updating profile',
      error
    })
  }
}

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });  // Note: No quotes around -1
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};  
export default {getOrdersController, registerController, loginController, testController, forgotPasswordController ,updateProfileController};
