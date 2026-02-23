const express = require("express");
const router = express.Router();

const { getWasteDetails } = require("../controllers/groqController");

router.post("/waste-details", getWasteDetails);

module.exports = router;
