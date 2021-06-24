const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//Submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
    
});

//get specific post
router.get('/:postId', async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({
            message: err
        })
    }
});


//delete specific post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.remove({_id: req.params.postId});
        res.json(post);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

//update specific post
router.patch('/:postId', async (req, res) => {
    try {
        const updated = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title }});
        res.json(updated);
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

module.exports = router;