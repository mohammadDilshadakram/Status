const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index.ejs", { files: files });

       });
   });

    app.get("/file/:filename", function (req, res) {
        fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
            console.log(filedata);
            res.render("show.ejs", { filename: req.params.filename, filedata: filedata });
        })

    })

    app.get("/edit/:filename", function (req, res) {
        fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
            // console.log(filedata);
            res.render("edit.ejs", { filename: req.params.filename, filedata: filedata });
        })


        // res.render("edit.ejs",{filename: req.params.filename, filedata:filedata});
    })



    app.post("/create", function (req, res) {
        //fs.writeFile(file, data[, options], callback)

        fs.writeFile(`./files/${req.body.username.split(" ").join("")}.txt`, req.body.about, function (err) {
            res.redirect("/");
        });

    })


    app.post("/edit", function(req,res){

        fs.rename("./files/${req.body.oldusername}","./files/${req.body.username}",function(err){
            fs.rename("./files/${req.body.oldabout}","./files/${req.body.about}",function(err){
                res.redirect("/");
            })
        })
        
        
        console.log(req.body);
    })
    


app.listen(8080, function () {
    console.log("server is listening");
})