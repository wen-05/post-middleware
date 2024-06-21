const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '請輸入您的名字']
          },
          email: {
            type: String,
            required: [true, '請輸入您的 Email'],
            unique: true,
            lowercase: true,
            select: false
          },
          photo: String,
    },
    { versionKey: false }  // 移除欄位 __v 方法」
);

const User = mongoose.model('user', userSchema);
module.exports = User;