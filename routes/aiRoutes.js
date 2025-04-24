const express = require('express');
const router = express.Router();

const aiController = require("../controllers/aiController");

router.post("/suggest-gift", aiController.suggestion);

module.exports = router;