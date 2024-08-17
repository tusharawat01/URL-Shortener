const express = require("express");
const { handleGeneratenewShortUrl, handleRedirectToUrl, handleDeleteAllUrl } = require("../controllers/url.controller");

const router = express.Router();

router.post('/url', handleGeneratenewShortUrl);

router.get('/:shortId', handleRedirectToUrl);

router.delete('/delete-all', handleDeleteAllUrl);

module.exports = router;