const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const pool = require("../db");

//PUT isSponsored for a review given reviewID
//PUT /updateSponsoredReview/{isSponsored}{reviewID}
router.put("/updateSponsoredReview", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let isSponsored = req.param("isSponsored") == "true";
      let reviewID = req.param("reviewID");
      connection.query(
        "UPDATE Review SET isSponsored = ? WHERE reviewID = ?;",
        [isSponsored, reviewID],
        function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating Restaurant table: \n", err);
            res.status(400).send("Problem updating table");
          } else {
            res.status(200).send(`Updated ${req.param("reviewID")} value!`);
          }
        }
      );
    }
  });
});

//POST Add a review
router.post("/addReview", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      let restaurantID = req.body["restaurantID"];
      let userID = req.body["userID"];
      let body = req.body["body"];
      let date = req.body["date"];
      let isSponsored = req.body["isSponsored"] == "true";
      let rating = req.body["rating"];
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "INSERT INTO Review (restaurantID, userID, body, date, isSponsored, rating) VALUES (?,?,?,?,?,?);",
        [restaurantID, userID, body, date, isSponsored, rating],
        function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into menuItem table: \n", err);
            res.status(400).send("Problem inserting into table");
          } else {
            res
              .status(200)
              .send(`added ${req.body.restaurantID} to the table!`);
          }
        }
      );
    }
  });
});

//GET /restaurantReviews/{restaurantID}
//gets reviews by restaurantID
router.get("/Restaurantreviews", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var restaurantID = req.query["restaurantID"];
      connection.query(
        "SELECT * FROM Review WHERE restaurantID = (?)",
        restaurantID,
        function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              data: [],
              error: "Error obtaining values",
            });
          } else {
            res.status(200).json({
              data: rows,
            });
          }
        }
      );
    }
  });
});

//GET /userReviews/{userID}
//gets reviews by userID
router.get("/userReviews", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var userID = req.query["userID"];
      connection.query(
        "SELECT * FROM Review WHERE userID = (?)",
        userID,
        function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              data: [],
              error: "Error obtaining values",
            });
          } else {
            res.status(200).json({
              data: rows,
            });
          }
        }
      );
    }
  });
});

module.exports = router;
