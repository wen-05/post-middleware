const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",   // 關聯 user 的 model
            required: [true, "貼文姓名未填寫"],
        },
        image: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            required: [true, 'Content 未填寫']
        },
        likes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: false  // 搜尋時不顯示
        },
    },
    { versionKey: false }  // 移除欄位 __v 方法」
);

const Post = mongoose.model('post', postSchema);
module.exports = Post;