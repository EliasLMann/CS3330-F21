const pool = require("./db");
const crypto = require("crypto");
const secret = "popStopDB";
const cookieName = "pStpFndr";
const { json } = require("body-parser");

module.exports = function routes(app, logger) {
  // GET /
  app.get("/", (req, res) => {
    res.status(200).send("Go to 0.0.0.0:3000.");
  });

  // POST /reset
  app.post("/reset", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query(
          "drop table if exists test_table",
          function (err, rows, fields) {
            if (err) {
              // if there is an error with the query, release the connection instance and log the error
              connection.release();
              logger.error("Problem dropping the table test_table: ", err);
              res.status(400).send("Problem dropping the table");
            } else {
              // if there is no error with the query, execute the next query and do not release the connection yet
              connection.query(
                "CREATE TABLE `PopStop`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);",
                function (err, rows, fields) {
                  if (err) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release();
                    logger.error(
                      "Problem creating the table test_table: ",
                      err
                    );
                    res.status(400).send("Problem creating the table");
                  } else {
                    // if there is no error with the query, release the connection instance
                    connection.release();
                    res.status(200).send("created the table");
                  }
                }
              );
            }
          }
        );
      }
    });
  });

  // POST /multplynumber
  app.post("/multplynumber", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "INSERT INTO `PopStop`.`test_table` (`value`) VALUES('" +
            req.body.product +
            "')",
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into test table: \n", err);
              res.status(400).send("Problem inserting into table");
            } else {
              res.status(200).send(`added ${req.body.product} to the table!`);
            }
          }
        );
      }
    });
  });

  // GET /checkdb
  app.get("/values", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT value FROM `PopStop`.`test_table`",
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

  // ============================================GET /restaurants===================================================
  app.get("/restaurants", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT * FROM `PopStop`.`Restaurant`",
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

  //===================================GET locations of restaurants========================================
  app.get("/restaurants/locations", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT location FROM `PopStop`.`Restaurant`",
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

  //===================================GET users========================================
  app.get("/users", (req, res) => {
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

  //=================================POST /register==================================
  //sign in api to create new user
  app.post("/register", async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        //logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        let userName = req.body.userName;
        let password = req.body.password;
        let restaurantID = null;
        const hash = crypto
          .createHmac("sha256", secret)
          .update(password)
          .digest("hex");
        let insert = [[userName, hash, restaurantID]];

        //checking if the provided username already exists
        let sql1 = "SELECT userID FROM User WHERE userName ='" + userName + "'";
        connection.query(sql1, function (err, rows, fields) {
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              data: [],
              error: "Error obtaining values",
            });
          } else {
            //if the username is not taken
            if (rows.length == 0) {
              let sql =
                "INSERT INTO User (userName, password, restaurantID) VALUES ?";
              console.log(sql);
              // if there is no issue obtaining a connection, execute query and release connection
              connection.query(sql, [insert], function (err, rows, fields) {
                connection.release();
                if (err) {
                  logger.error("Error while fetching values: \n", err);
                  res.status(400).json({
                    data: [],
                    error: "Error obtaining values",
                  });
                } else {
                  let users = {
                    username: userName,
                    pxcd: hash,
                  };
                  res.cookie(cookieName, users);
                  res.status(200).json({
                    data: rows,
                  });
                }
              });
            } else {
              //user already exists
              res.status(400).json({
                status: 1,
              });
            }
          }
        });
      }
    });
  });

  //================================Assign a restaurant to a user======================================
  app.put("/assignRestaurant", (req, res) => {
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
        console.log(userID);
        console.log(newRestID);
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
};
