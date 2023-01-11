const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Candidate = require("./candidateSchema");
const csvtojson = require("csvtojson");
var async = require("async");
const e = require("express");

const app = express();

const URI = "";
mongoose.connect(URI).then(() => {
  console.log("database connected");
});

app.use(express.static("public"));
app.set("view engine", "ejs");

var excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/excelUploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var excelUploads = multer({ storage: excelStorage });
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// upload excel file and import in mongodb
app.post("/uploadExcelFile", excelUploads.single("uploadfile"), (req, res) => {
  importFile("./public" + "/excelUploads/" + req.file.filename);
  function importFile(filePath) {
    csvtojson()
      .fromFile(filePath)
      .then((source) => {
        // Fetching the all data from each row
        async.eachSeries(source, async (res) => {
          console.log(res["field1"]);
          var singleRow = {
            Korn_Ferry_Reference_level: res["field1"],
            Upper_decile90:
              res[
                "Total Cost to Company = Fixed Cost to Company + Variable Pay"
              ],
            Upper_quartile75: res["field3"],
            Median50: res["field4"],
            Lower_quartile25: res["field5"],
            Lower_decile10: res["field6"],
            Average: res["field7"],
            No_of_Incumbents: res["field8"],
            No_of_Organizations: res["field9"],
            Region: res["field10"],
            UrbanRural: res["field11"],
            Headcount: res["field12"],
            Funding: res["field13"],
            Thematic_Area: res["field14"],
            Category: res["field15"],
            Archetype: res["field16"],
            Department: res["field17"],
            Sub_department: res["field18"],
          };
          console.log(singleRow);
          await Candidate.create(singleRow);
        });
        res.render("sucess.ejs");
      })
      .catch((err) => res.render("fail.ejs"));
  }
});

app.get("/data/:id", async (req, res) => {
  var id = req.params.id;
  const userExist = await Candidate.findOne({
    Korn_Ferry_Reference_level: id,
  });
  if (userExist) {
    res.send(userExist);
  } else {
    console.log("Does not exit");
  }
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
