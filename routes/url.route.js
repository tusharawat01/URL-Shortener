const express = require("express");
const { handleGeneratenewShortUrl, handleRedirectToUrl, handleDeleteAllUrl } = require("../controllers/url.controller");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/', restrictToLoggedinUserOnly, handleGeneratenewShortUrl);

router.get('/:shortId', handleRedirectToUrl);

router.delete('/delete-all', handleDeleteAllUrl);

module.exports = router;