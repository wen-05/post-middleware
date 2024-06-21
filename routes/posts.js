const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts');

router.get('/', PostsController.getPosts);
router.post('/', PostsController.createPosts);
router.patch('/:id', PostsController.patchPosts);
router.delete('/', PostsController.deleteAllPosts);
router.delete('/:id', PostsController.deletePosts);


module.exports = router;
