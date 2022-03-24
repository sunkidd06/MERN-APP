const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth')
// @router Post api/post
// desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    // Simple validation
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is not required' })
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `http://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
        await newPost.save();
        res.json({ success: true, message: 'Happy learing!!', post: newPost })
    } catch (error) {

    }
})
// @router GET api/post
// desc GET ALL post
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId })
            // prams two of populate will save fileds we want  
            .populate('user', ['username'])
        res.json({ posts, success: true })
    } catch (error) {
        res.send({ success: false, message: "Cant not connect to database" })
    }
})
router.get('/getall', (req, res) => {
    Post.find({})
        .then(data => {
            res.send({ data, postsLoading: true });
        })
        .catch(err => res.send(err));
})
// @router PUT api/post
// desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is not required' })
    }
    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url?.startsWith('https://') ? url : `http://${url}` || ''),
            status: status || 'TO LEARN',
        }
        // Dieu kien de update 1 post 
        // + Post phai co o trong database  
        // + Nguoi dung phai co quyen thay doi Post. Tuc la post day phai co userId tu middleware
        const postUpdateCondition = { _id: req.params.id, userId: req.userId };
        // tham so trong findOneAndUpdate() 
        // 1: Dieu kien de update
        // 2: Data chung ta muon thay doi
        //  va them 1 option {new: true}. No se tra ve Post da dc update. Neu ko no se tra ve Post cu
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });
        // User not authorised to update post
        if (!postUpdateCondition) {
            res.status(401).json({ success: false, message: 'POst not found or user not authorized' });
        }
        res.json({ success: true, message: 'Excellent progress', post: updatePost });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Update failed' })
    }
})
// @router DELETE api/post
// desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    // const { title, description, url, status } = req.body;
    try {

        // Dieu kien de delete 1 post 
        // + Post phai co o trong database  
        // + Nguoi dung phai co quyen xoa Post. Tuc la post day phai co userId tu middleware
        const postDeleteCondition = { _id: req.params.id, userId: req.userId };
        // tham so trong findOneAndUpdate() 
        // 1: Dieu kien de update
        // 2: Data chung ta muon xoa
        //  va them 1 option {new: true}. No se tra ve Post da dc update. Neu ko no se tra ve Post cu
        deletePost = await Post.deleteOne(postDeleteCondition);
        // User not authorised to update post
        if (!postDeleteCondition) {
            res.status(401).json({ success: false, message: 'POst not found or user not authorized' });
        }
        res.json({ success: true, message: 'Delete successfully' });
    } catch (error) {
    }
})

module.exports = router;