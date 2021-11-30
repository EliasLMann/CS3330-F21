const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const pool = require("../db");

// POST /photo
// Adds photo to the photo table of given restaurantID
router.post("/photo", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let restaurantID = req.body.restaurantID;
      let url = req.body.url;
      let title = req.body.title;
      connection.query(
        "INSERT INTO Photo(restaurantID, URL, title) VALUES(?,?,?);",
        [restaurantID, url, title],
        function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into Menu table: \n", err);
            res.status(400).send("Problem inserting into table");
          } else {
            res.status(200).send(`added photo to the table!`);
          }
        }
      );
    }
  });
});

router.delete("/deletePhoto", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var photoID = req.param("photoID");
      connection.query(
        "DELETE FROM `PopStop`.`Photo` WHERE photoID = ?",
        photoID,
        function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem deleting from MenuItem table: \n", err);
            res.status(400).send("Problem deleting from table");
          } else {
            res.status(200).send(`removed photo from the table`);
          }
        }
      );
    }
  });
});

module.exports = router;
