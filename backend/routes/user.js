const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const pool = require("../db");

//===================================GET users========================================
router.get("/users", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT * FROM `PopStop`.`User`",
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

//================================Assign a restaurant to a user======================================
router.put("/assignRestaurant", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      //query values
      let userID = req.body.userID;
      let newRestID = req.body.newRestID;
      let sql1 = "SELECT * FROM User WHERE userID = '" + userID + "'";

      connection.query(sql1, function (err, rows, fields) {
        if (err) {
          logger.error("Error while fetching values: \n", err);
          res.status(400).json({
            data: [],
            error: "Error obtaining values",
          });
        } else {
          console.log(rows.length);
          //if the user exists
          if (rows.length > 0) {
            let sql2 =
              "UPDATE User SET restaurantID = '" +
              newRestID +
              "' WHERE userID = '" +
              userID +
              "'";
            connection.query(sql2, function (err, rows, fields) {
              if (err) {
                logger.error("Error while updating table: \n", err);
                res.status(400).json({
                  data: [],
                  error: "Error updating table values",
                });
              } else {
                //changed!
                res.status(200).json({ status: 0 });
              }
            });
          }
          //if the user doesn't exist
          else {
            logger.error("Error while finding user: \n", err);
            res.status(200).json({ status: 1 });
            res.end();
          }
        }
      });
    }
    connection.release();
  });
});

// GET /user/{userName}
router.get("/user", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let userName = req.query["userName"];
      connection.query(
        "SELECT * FROM User WHERE userName = ?",
        userName,
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

// DELETE /user/delete{userID}
// deleting a user from the database by userID
router.delete("/user/delete", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var userID = req.param("userID");
      connection.query(
        "DELETE FROM `PopStop`.`User` WHERE userID = ?",
        userID,
        function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem deleting from MenuItem table: \n", err);
            res.status(400).send("Problem deleting from table");
          } else {
            res.status(200).send(`removed user from the table`);
          }
        }
      );
    }
  });
});

module.exports = router;
