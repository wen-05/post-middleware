const handleError = require('../service/handleError');

const handleErrorAsync = function (func) {
    return function (req, res, next) {
        func(req, res, next).catch(
            function (error) {
                handleError(res, error.message || '內部伺服器錯誤');
                return next(error);
            });
    };
};

module.exports = handleErrorAsync;