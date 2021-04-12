var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");
var fs = require("fs");
AWS.config.loadFromPath("./config.json");
var rekognition = new AWS.Rekognition();

router.post("/", (req, res) => {
  var path_image = req.body.image;
  var params = {};
  fs.readFile(path_image, function (err, data) {
    if (err) {
      console.log(err);
    }
    params = {
      CollectionId: "6jj2",
      DetectionAttributes: [],
      ExternalImageId: req.body.text,
      Image: { Bytes: data },
    };
    rekognition.indexFaces(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      console.log("등록되었습니다.");
      res.redirect("/");
    });
  });
});

module.exports = router;
