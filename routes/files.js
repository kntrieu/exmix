const express = require('express');
const textract = require('textract');
const extractQuestionsFromFile = require('../helpers/fileHelpers');
const router = express.Router();

module.exports = router;

router.post('/', async (req, res) => {
    try {
        let data = await textract.fromBufferWithMime(req.files.file.mimetype, req.files.file.data, {preserveLineBreaks: true}, 
            function( error, text ) {
            const questions = extractQuestionsFromFile(text);
            res.json(questions);
        });
    } catch (err) {
        res.json({message: err});
    }
    
});