const User = require("../models/userModels");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const JWT = require("jsonwebtoken");
const sendEmail = require("../helper/sendEmail");


// ==========================
// REGISTER CONTROLLER
// ==========================
const registerController = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone,
      address,
    } = req.body;


    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }


    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }


    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }


    const existingUser = await User.findOne({ email });


    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered",
      });
    }


    const hashedPassword = await hashPassword(password);


    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,
      address,

    });

    // Send Welcome Email
    await sendEmail(
      user.email,
      "🎉 Welcome to MarketGo",
      `
  <div style="font-family:Arial;padding:20px">
    <h2>Welcome to MarketGo 🛒</h2>

    <p>Hello <b>${user.name}</b>,</p>

    <p>Your account has been created successfully.</p>

    <p>You can now login and start shopping.</p>

    <hr>

    <h3>Your Details</h3>

    <p><b>Name:</b> ${user.name}</p>
    <p><b>Email:</b> ${user.email}</p>

    <br>

    <p>Thank you for choosing <b>MarketGo ❤️</b></p>
  </div>
  `
    );

    const token = JWT.sign(
      {
        _id: user._id
      },
      process.env.JWT_CODE,
      {
        expiresIn: "7d"
      }
    );



    res.status(201).send({

      success: true,
      message: "Registration Successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },

      token,

    });



  } catch (error) {

    console.log(error);

    res.status(500).send({

      success: false,
      message: "Error in Registration",
      error: error.message,

    });

  }
};



// ==========================
// LOGIN CONTROLLER
// ==========================
const loginController = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;



    if (!email || !password) {

      return res.status(400).send({

        success: false,
        message: "Email and Password are required",

      });

    }



    const user = await User.findOne({ email });


    if (!user) {

      return res.status(404).send({

        success: false,
        message: "Email is not registered",

      });

    }



    const match = await comparePassword(
      password,
      user.password
    );



    if (!match) {

      return res.status(401).send({

        success: false,
        message: "Invalid Password",

      });

    }



    const token = JWT.sign(

      {
        _id: user._id
      },

      process.env.JWT_CODE,

      {
        expiresIn: "7d"
      }

    );



    res.status(200).send({

      success: true,
      message: "Login Successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },

      token,

    });



  } catch (error) {

    console.log(error);

    res.status(500).send({

      success: false,
      message: "Error in Login",
      error: error.message,

    });

  }

};




// ==========================
// GET PROFILE
// ==========================
const getProfileController = async (req, res) => {

  try {

    const user = await User
      .findById(req.user._id)
      .select("-password");



    res.status(200).send({

      success: true,
      user,

    });



  } catch (error) {

    console.log(error);


    res.status(500).send({

      success: false,
      message: "Error getting profile",
      error: error.message,

    });

  }

};




// ==========================
// UPDATE PROFILE
// ==========================
const updateProfileController = async (req, res) => {

  try {

    const {
      name,
      password,
      phone,
      address
    } = req.body;



    const user = await User.findById(req.user._id);



    if (!user) {

      return res.status(404).send({

        success: false,
        message: "User not found",

      });

    }



    let hashedPassword = user.password;



    if (password) {

      if (password.length < 6) {

        return res.status(400).send({

          success: false,
          message: "Password must be at least 6 characters",

        });

      }


      hashedPassword = await hashPassword(password);

    }



    const updatedUser = await User.findByIdAndUpdate(

      req.user._id,

      {

        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        password: hashedPassword,

      },

      {
        new: true
      }

    )
      .select("-password");



    res.status(200).send({

      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,

    });



  } catch (error) {

    console.log(error);

    res.status(500).send({

      success: false,
      message: "Error Updating Profile",
      error: error.message,

    });

  }

};




// ==========================
// FORGOT PASSWORD - SEND OTP
// ==========================
const forgotPasswordController = async (req, res) => {

  try {


    const {
      email,
    } = req.body;



    if (!email) {

      return res.status(400).send({

        success: false,
        message: "Please provide email",

      });

    }



    const user = await User.findOne({
      email,
    });



    if (!user) {

      return res.status(404).send({

        success: false,
        message: "Wrong Email or Security Answer",

      });

    }



    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();



    user.resetOtp = otp;

    user.resetOtpExpiry =
      Date.now() + 10 * 60 * 1000;



    await user.save();



    await sendEmail(

      user.email,

      "🔐 MarketGo Password Reset OTP",

      `

      <div style="font-family:Arial;padding:20px">

      <h2>MarketGo Password Reset</h2>

      <p>Hello ${user.name}</p>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>This OTP expires in 10 minutes.</p>

      <br>

      <b>Team MarketGo ❤️</b>

      </div>

      `

    );



    res.status(200).send({

      success: true,
      message: "OTP sent successfully",

    });



  } catch (error) {

    console.log(error);


    res.status(500).send({

      success: false,
      message: "Error sending OTP",
      error: error.message,

    });

  }

};




// ==========================
// VERIFY OTP (read-only check, used before the reset-password step)
// ==========================
const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.resetOtp) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (
      user.resetOtp !== otp ||
      !user.resetOtpExpiry ||
      user.resetOtpExpiry < Date.now()
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    res.status(200).send({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

// ==========================
// RESET PASSWORD USING OTP
// ==========================
const resetPasswordController = async (req, res) => {

  try {
console.log(req.body);

    const {
      email,
      otp,
      newPassword
    } = req.body;



    if (!email || !otp || !newPassword) {

      return res.status(400).send({

        success: false,
        message: "Please provide all fields",

      });

    }



    if (newPassword.length < 6) {

      return res.status(400).send({

        success: false,
        message: "Password must be at least 6 characters",

      });

    }



    const user = await User.findOne({
      email
    });



    if (!user) {

      return res.status(404).send({

        success: false,
        message: "User not found",

      });

    }




    if (
      user.resetOtp !== otp ||
      user.resetOtpExpiry < Date.now()
    ) {

      return res.status(400).send({

        success: false,
        message: "Invalid or expired OTP",

      });

    }




    user.password =
      await hashPassword(newPassword);



    user.resetOtp = undefined;

    user.resetOtpExpiry = undefined;



    await user.save();



    res.status(200).send({

      success: true,
      message: "Password Reset Successfully",

    });



  } catch (error) {

    console.log(error);


    res.status(500).send({

      success: false,
      message: "Error resetting password",
      error: error.message,

    });

  }

};




// ==========================
// EXPORT CONTROLLERS
// ==========================
module.exports = {

  registerController,

  loginController,

  verifyOtpController,

  getProfileController,

  updateProfileController,

  forgotPasswordController,

  resetPasswordController,

};