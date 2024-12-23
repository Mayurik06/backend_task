import Post from "../models/postmodel.js";

export const filterPost = async (req, res) => {
  const { searchText, startDate, endDate, tags } = req.query;
  try {
    const filters = {};

    if (searchText) {
      filters.$or = [
        { postName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }
    if (startDate || endDate) {
      filters.uploadTime = {};
      if (startDate) filters.uploadTime.$gte = new Date(startDate);
      if (endDate) filters.uploadTime.$lte = new Date(endDate);
    }

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : tags.split(",");
      filters.tags = { $in: tagsArray };
    }
    const posts = await Post.find(filters);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "filtered data", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
