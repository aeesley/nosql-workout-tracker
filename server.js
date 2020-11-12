// SERVER DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// DESIGNATING THE PORT
const PORT = process.env.PORT || 3030

// CREATING INSTANCE OF EXPRESS APP
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//mongodb+srv://Alex:<password>@workouttracker.d9ohy.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Alex:12345@workouttracker.d9ohy.mongodb.net/WorkoutTracker?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let WorkoutModel = require("./models/workout");
// ROUTES TO DISPLAY HTML PAGES

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get("/exercise", (req,res) => {
      res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
  });
  
  app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
  });


  app.get("/api/workouts", (req,res) => {
    console.log("we hit the route!");
    WorkoutModel.find({}).then(function(data) {
      console.log('did we find anyhting ??', data)
      res.json(data)
    })
  });


  app.get("/api/workouts/range", (req,res) => {
    console.log("we hit the stats route!");
    WorkoutModel.find({}).limit(7).then(function(data) {
      console.log('did we find any stats ??', data)
      res.json(data)
    })
  });




  app.post("/api/workouts", (req,res) => {
    console.log("we hit the create route!");
    WorkoutModel.create({exercises:[]}).then(function(data) {
      console.log('did we create anything ??', data)
      res.json(data)
    })
  });

  app.put("/api/workouts/:id", (req,res) => {
    console.log("we hit the create route!", req.body);
    console.log('our params!!!', req.params)
    

    WorkoutModel.findOneAndUpdate(
      { _id: req.params.id }, 
      { $push: {
          exercises: req.body
      }}
      ).then(function(data) {
      console.log('did we create anything ??', data)
      res.json(data)
    })

  });



  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

// app.use(require("./routes/api.js"));

// app.use(logger("dev"));

// NAMING DATABASE & URL
// const databaseUrl = "workoutdb";
// const collections = ["exercises"];
// const db = mongojs(databaseUrl, collections);

// // ALERTING IF DB ERROR
// db.on("error", error => {
//   console.log("Database Error:", error);
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "./public/index.html"));
// });

// app.post("/submit", (req, res) => {
//   console.log(req.body);

//   db.notes.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.get("/all", (req, res) => {
//   db.notes.find({}, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.get("/find/:id", (req, res) => {
//   db.notes.findOne(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });

// app.post("/update/:id", (req, res) => {
//   db.notes.update(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     {
//       $set: {
//         title: req.body.title,
//         note: req.body.note,
//         modified: Date.now()
//       }
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   db.notes.remove(
//     {
//       _id: mongojs.ObjectID(req.params.id)
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });

// app.delete("/clearall", (req, res) => {
//   db.notes.remove({}, (error, response) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(response);
//     }
//   });
// });






