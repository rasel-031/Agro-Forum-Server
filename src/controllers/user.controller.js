import {
  REGISTERED_SUCCESS,
  REGISTERED_FAILED,
  REGISTERED_EXIST,
  AUTH_FAILED,
  AUTH_SUCCESS,
  POST_FAILED,
  POST_SUCCESS,
} from "../utils/Message.utils.js";
import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";
import { userValidation } from "../validation/user.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordHash from "../hash/passwordHash.js";

export const userSignUp = async (req, res) => {
  try {
    //user validation check
    const isValidate = await userValidation(req.body);
    if (isValidate && isValidate.length > 0) {
      return res.status(400).json(REGISTERED_EXIST);
    }
    //create new user before hashing password
    let data = req.body;
    data = {
      ...data,
      email: data.email.toLowerCase(),
      password: await passwordHash(data.password),
    };

    const user = new userModel(data);
    await user.save();

    return res.status(200).json(REGISTERED_SUCCESS);
  } catch (error) {
    console.log(error);
    return res.status(500).json(REGISTERED_FAILED);
  }
};

export const userSignIn = async (req, res) => {
  try {
    //user validation check
    const isValidate = await userValidation(req.body);

    if (isValidate && isValidate.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        isValidate[0].password
      );

      //if user not exist
      if (!isValidPassword) return res.status(500).json(AUTH_FAILED);

      //authentication success
      const token = jwt.sign(
        {
          id: isValidate[0]._id,
          email: isValidate[0].email,
          name: isValidate[0].name,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "12h" }
      );

      // res.cookie('jwt', token, {httpOnly: true});

      return res.status(200).json({ access_token: token, ...AUTH_SUCCESS });
    } else {
      return res.status(500).json(AUTH_FAILED);
    }
  } catch (error) {
    return res.status(500).json(AUTH_FAILED);
  }
};

//user write there new post
export const userNewPost = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    if (Object.keys(data) !== 0 && req.file === undefined) {
      const post = new postModel({ ...data, userId: userId, imageURL: "" });
      await post.save();
      return res.status(200).json(POST_SUCCESS);
    }
    else if (Object.keys(data) !== 0 && req.file !== undefined) {
      const imageUrl = process.env.DOMAIN_URL + "uploads/" + req.file.filename;

      const post = new postModel({ ...data, userId: userId, imageURL: imageUrl });
      await post.save();
      return res.status(200).json(POST_SUCCESS);
    }
    else{
      return res.status(500).json(POST_FAILED);
    }

  } catch (error) {
    return res.status(500).json(POST_FAILED);
  }
};
