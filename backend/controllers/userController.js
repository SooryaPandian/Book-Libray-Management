// // controllers/userController.js
// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Adjust path based on your project structure

// // Function to handle password update
// const updateUserPassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   try {
//     const user = await User.findById(req.user.id); // Assuming `req.user` holds the authenticated user's info

//     // Check if current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Current password is incorrect' });
//     }

//     // Hash the new password and update it
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { updateUserPassword };
