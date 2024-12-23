import Post from "../models/postmodel.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const { userId, postName, description, uploadTime, tags, imageUrl } =
      req.body;

    if (!userId || !postName) {
      return res
        .status(400)
        .json({ message: "fill all reuired feilds", success: false });
    }

    //to check user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    //to check time
    const currentTime = new Date();
    if (new Date(uploadTime) < currentTime) {
      return res
        .status(400)
        .json({ message: "upload time cannot be in the past" });
    }
    const newPost = new Post({
      userId,
      postName,
      description,
      uploadTime,
      tags,
      imageUrl,
    });
    await newPost.save();

    user.post.push(newPost._id);
    await user.save();
    return res
      .status(200)
      .json({ message: "Post created successfully", success: true,newPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
