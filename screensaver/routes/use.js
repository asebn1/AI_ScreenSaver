var express = require("express");
var router = express.Router();

const { exec } = require("child_process");

router.post("/", function (req, res, next) {
  console.log(req.body)
  if(req.body.landing == "true"){
    res.render('use', { method: req.body.type })
  }
  else{
    exec(
      "python action.py " +
        req.body.type,
      (error, stdout, stderr) => {
        if (error) {
          res.render("error",{message : "Error", title:"No action.py", content:"make sure you have cloned github repository" });
          return;
        }
        if (stderr) {
          res.render("error",{message : "Error", title:"No action.py", content:"make sure you have cloned github repository" });
          return;
        }
        console.log(`stdout: ${stdout}`);
        res.render("action");
      }
    );
  }
});

router.get("/", function (req, res, next) {
  res.render('use')
});

module.exports = router;
