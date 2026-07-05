import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    //  console.log("BODY:", req.body);
    const { firebaseUid, name, email, photoURL } = req.body;

    let user = await User.findOne({
      firebaseUid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid,
        name,
        email,
        photoURL,
      });
    } else {
      user.name = name;
      user.email = email;
      user.photoURL = photoURL;

      await user.save();
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

