const Post = require('../models/posts');
const User = require('../models/user');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');

const posts = {
    async getPosts(req, res, next) {
        const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
        const search = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
        const getData = await Post.find(search).populate({
            path: 'user',
            select: 'name photo '
        }).sort(timeSort);
        handleSuccess(res, "取得貼文資料", getData);
    },

    createPosts: handleErrorAsync(async (req, res, next) => {
        const getData = req.body;

        // 判斷必填欄位是否填寫
        if (!getData.user || !getData.content) {
            return handleError(res, "請確實填寫必填欄位");
        }

        const newPost = await Post.create(getData);
        handleSuccess(res, "新增資料成功", newPost);
    }),

    patchPosts: handleErrorAsync(async (req, res, next) => {
        const id = req.params.id;
        const oldData = await Post.findById(id);
        const getData = req.body;

        // 判斷必填欄位是否填寫
        if (!getData.user || !getData.content) {
            return handleError(res, "請確實填寫必填欄位");
        }

        if (oldData) {
            // 判斷是否有修改欄位
            const isDifferent = Object.keys(getData).some(key => oldData[key] !== getData[key]);

            if (isDifferent) {
                newData = await Post.findByIdAndUpdate(id, getData, { new: true });   // 取得最新資料
                handleSuccess(res, "單筆資料更新成功", newData);
            } else {
                handleError(res, "欄位資料與原資料相同");
            }
        } else {
            handleError(res, "找不到此id");
        }
    }),

    async deleteAllPosts(req, res, next) {
        await Post.deleteMany({});
        handleSuccess(res, "刪除所有資料成功", []);
    },

    deletePosts: handleErrorAsync(async (req, res, next) => {
        const id = req.params.id;
        const oldData = await Post.findById(id);

        if (oldData) {
            await Post.findByIdAndDelete(id);
            handleSuccess(res, "此資料刪除成功", null);
        } else {
            handleError(res, "找不到此id資料");
        }
    })
};

module.exports = posts;