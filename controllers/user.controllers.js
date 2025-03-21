const User = require("../models/user.model.js");

// 🔹 Add a new user
const addUser = async (req, res) => {
  try {
    const { name, referrerId } = req.body;
    const newUser = new User({ name, referrerId });
    await newUser.save();
    res.status(201).json({ success: true, message: "User added", user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding user", error });
  }
};

const buildTree = (users, parentId) => {
    return users
      .filter(user => String(user.referrerId) === String(parentId))
      .map(user => ({
        id: user._id,
        name: user.name,
        children: buildTree(users, user._id) // Recursively build tree
      }));
  };

// 🔹 Get all downlines (referrals)
const getDownlines = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
        const downlines = await User.aggregate([
          { $match: { _id: user._id } },
          {
            $graphLookup: {
              from: "users",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "referrerId",
              as: "downlines"
            }
          }
        ]);
    
        // Convert the flat array to a tree structure
        const tree = buildTree(downlines[0].downlines, userId);
    
        res.json({ success: true, tree });
      } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tree", error });
      }
};

// 🔹 Get all uplines (referrer chain)
const getUplines = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const uplines = await User.aggregate([
      { $match: { _id: user._id } },
      {
        $graphLookup: {
          from: "users",
          startWith: "$referrerId",
          connectFromField: "referrerId",
          connectToField: "_id",
          as: "uplines"
        }
      }
    ]);

    res.json({ success: true, uplines: uplines[0].uplines });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching uplines", error });
  }
};

module.exports = {addUser, getDownlines, getUplines};
