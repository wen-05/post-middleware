const User = require('../models/user');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const user = {
    async getUsers(req, res) {
        const getData = await User.find();
        handleSuccess(res, "取得使用者所有資料", getData);
    }
}

module.exports = user;