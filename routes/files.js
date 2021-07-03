const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/', async (req, res) => {
    try {
        console.log(req.files);
        res.json("OK");
    } catch (err) {
        res.json({message: err});
    }
    
});