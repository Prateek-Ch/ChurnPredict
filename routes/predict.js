const express = require('express');
const router = express.Router();


router.post('/upload', (req, res) => {
   res.redirect('/result');    
});

module.exports = router;
