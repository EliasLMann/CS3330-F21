const pool = require("./db");
const crypto = require("crypto");
const secret = "popStopDB";
const cookieName = "pStpFndr";
const { json } = require("body-parser");
const e = require("express");
const restaurant = require("./routes/restaurant");

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

  // for user story 1.7
  // GET meal types and the associated IDs
  app.get("/getmealtypes", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT itemID, mealType FROM `PopStop`.`MenuItem`",
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

  // GET /menu
  app.get("/menu", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT * FROM `PopStop`.`Menu`",
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

  // GET /topmenuitem
  app.get("/topmenuitem", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT * FROM `PopStop`.`MenuItem` order by (likes - dislikes) desc limit 5",
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

  // user story 4.1
  // UPDATE MenuItem to change photo
  // takes photo url and updates photo url
  app.put("/updatephoto", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var photoNew = req.param("photoNew");
        var itemID = req.param("itemID");
        connection.query(
          "SELECT * FROM PopStop.MenuItem WHERE itemID =" + itemID,
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

  //GET /menuItems/{restaurantID}
  //gets menuItems by restaurantID
  app.get("/menuItems", (req, res) => {
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
          "SELECT * FROM MenuItem WHERE restaurantID = (?)",
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

  // for user story 6.1
  // POST MenuItem
  app.post("/postmenuitem", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var restaurantID = req.param("restaurantID");
        var price = req.param("price");
        var itemName = req.param("itemName");
        var itemLink = req.param("itemLink");
        var mealType = req.param("mealType");
        var likes = req.param("likes");
        var dislikes = req.param("dislikes");
        var featured = req.param("featured");
        var photo = req.param("photo");
        var description = req.param("description");
        connection.query(
          "INSERT INTO `PopStop`.`MenuItem` (restaurantID, price, itemName, itemLink, mealType, likes, dislikes, featured, photo, description) VALUES(?,?,?,?,?,?,?,?,?,?)",
          [
            restaurantID,
            price,
            itemName,
            itemLink,
            mealType,
            likes,
            dislikes,
            featured,
            photo,
            description,
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into MenuItem table: \n", err);
              res.status(400).send("Problem inserting into table");
            } else {
              res.status(200).send(`added ${req.body.product} to the table!`);
            }
          }
        );
      }
    });
  });

  // PUT /updateitem/{itemID}
  app.put("/updateitem", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var restaurantID = req.param("restaurantID");
        var itemID = req.param("itemID");
        var price = req.param("price");
        var itemLink = req.param("itemLink");
        var mealType = req.param("mealType");
        var likes = req.param("likes");
        var dislikes = req.param("dislikes");
        var featured = req.param("featured");
        var photo = req.param("photo");
        var description = req.param("description");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET restaurantID = ?, price = ?, itemLink = ?, mealType = ?, likes = ?, dislikes = ?, featured = ?, photo = ?, description = ? WHERE itemID = ?",
          [
            restaurantID,
            price,
            itemLink,
            mealType,
            likes,
            dislikes,
            featured,
            photo,
            description,
            itemID,
          ],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into MenuItem table: \n", err);
              res.status(400).send("Problem inserting into table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updateitemlink/{itemID} for particular menuItem
  app.put("/updateitemlink", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var itemLink = req.param("itemLink");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET itemLink = ? WHERE itemID = ?",
          [itemLink, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem updating MenuItem table: \n", err);
              res.status(400).send("Problem updating table");
            } else {
              res.status(200).send(`added ${req.body.product} to the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 4.3, 8.2, 9.3, 9.4, and 10.2
  // GET /menuitem/{itemID}
  app.get("/menuitem", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "SELECT * FROM PopStop.MenuItem WHERE itemID =" + itemID,
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

  // for user story 3.1
  // POST /postmenu
  // takes all params and creates an associated menu
  app.post("/postmenu", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var body = req.param("body");
        var rating = req.param("rating");
        connection.query(
          "INSERT INTO `PopStop`.`Menu`(body, rating) VALUES(?,?)",
          [restaurantID, body, rating],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into Menu table: \n", err);
              res.status(400).send("Problem inserting into table");
            } else {
              res.status(200).send(`added ${req.body.product} to the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatemealtype/{itemID} for particular menuItem
  app.put("/updatemealtype", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var mealType = req.param("mealType");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET mealType = ? WHERE itemID = ?",
          [mealType, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatelikes/{itemID} for particular menuItem
  app.put("/updatelikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var likes = req.param("likes");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET likes = ? WHERE itemID = ?",
          [likes, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatedislikes/{itemID} for particular menuItem
  app.put("/updatedislikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var dislikes = req.param("dislikes");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET dislikes = ? WHERE itemID = ?",
          [dislikes, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // UPDATE /incrementlikes/{itemID} for particular menuItem
  app.put("/incrementlikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET likes = (likes + 1) WHERE itemID = ?",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // UPDATE /incrementdislikes/{itemID} for particular menuItem
  app.put("/incrementdislikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET dislikes = (dislikes + 1) WHERE itemID = ?",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  //PUT isSponsored for a review given reviewID
  //PUT /updateSponsoredReview/{reviewID}
  app.put("/updateSponsoredReview", (req, res) => {
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

  // for user story 4.3, 8.2, 9.3, 9.4, and 10.2
  // GET /menuitem/{itemID}
  app.get("/menuitem", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "SELECT * FROM PopStop.MenuItem WHERE itemID =" + itemID,
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

  // POST /photo
  // Adds photo to the photo table of given restaurantID
  app.post("/photo", (req, res) => {
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
              res.status(200).send(`added ${req.body.product} to the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatedescription/{itemID} for particular menuItem
  app.put("/updatedescription", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var description = req.param("description");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET description = ? WHERE itemID = ?",
          [description, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.3
  // DELETE /deleteitem/{itemID}
  app.delete("/deleteitem", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "DELETE FROM `PopStop`.`MenuItem` WHERE itemID = ?",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem deleting from MenuItem table: \n", err);
              res.status(400).send("Problem deleting from table");
            } else {
              res
                .status(200)
                .send(`removed item ${req.param("itemID")} from the table`);
            }
          }
        );
      }
    });
  });

  // for user story 5.3
  // UPDATE /removeprice/{menuItemID}
  app.put("/removeprice", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET price = NULL WHERE itemID = ?",
          [itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem changing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatemealtype/{itemID} for particular menuItem
  app.put("/updatemealtype", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var mealType = req.param("mealType");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET mealType = ? WHERE itemID = ?",
          [mealType, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatelikes/{itemID} for particular menuItem
  app.put("/updatelikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var likes = req.param("likes");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET likes = ? WHERE itemID = ?",
          [likes, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatedislikes/{itemID} for particular menuItem
  app.put("/updatedislikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var dislikes = req.param("dislikes");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET dislikes = ? WHERE itemID = ?",
          [dislikes, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // UPDATE /incrementlikes/{itemID} for particular menuItem
  app.put("/incrementlikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.query["itemID"];
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET likes = (likes + 1) WHERE itemID = (?)",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res.status(200).send(`changed item in the table!`);
            }
          }
        );
      }
    });
  });

  // UPDATE /incrementdislikes/{itemID} for particular menuItem
  app.put("/incrementdislikes", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.query["itemID"];
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET dislikes = (dislikes + 1) WHERE itemID = (?)",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res.status(200).send(`changed item in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatefeatured/{itemID} for particular menuItem
  app.put("/updatefeatured", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var featured = req.param("featured");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET featured = ? WHERE itemID = ?",
          [featured, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.2
  // UPDATE /updatedescription/{itemID} for particular menuItem
  app.put("/updatedescription", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        var description = req.param("description");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET description = ? WHERE itemID = ?",
          [description, itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem editing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
            }
          }
        );
      }
    });
  });

  // for user story 6.3
  // DELETE /deleteitem/{itemID}
  app.delete("/deleteitem", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "DELETE FROM `PopStop`.`MenuItem` WHERE itemID = ?",
          itemID,
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem deleting from MenuItem table: \n", err);
              res.status(400).send("Problem deleting from table");
            } else {
              res
                .status(200)
                .send(`removed item ${req.param("itemID")} from the table`);
            }
          }
        );
      }
    });
  });

  // for user story 5.3
  // UPDATE /removeprice/{menuItemID}
  app.put("/removeprice", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        var itemID = req.param("itemID");
        connection.query(
          "UPDATE `PopStop`.`MenuItem` SET price = NULL WHERE itemID = ?",
          [itemID],
          function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem changing MenuItem table: \n", err);
              res.status(400).send("Problem editing table");
            } else {
              res
                .status(200)
                .send(`changed item ${req.param("itemID")} in the table!`);
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
        res.status(69).send("Problem obtaining MySQL connection");
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
            res.status(420).json({
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
              res.status(405).json({
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

  //===========================login======================================
  //authentification route, returns 0 if successful login, 1 if user doesn't exist, and 2 if incorrect password
  app.get("/login", async (req, res) => {
    console.log(req.cookies);

    // obtain a connection from our pool of connections
    pool.getConnection(async function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        let userName = req.query["userName"];
        let password = req.query["password"];
        let sql1 = "SELECT userID FROM User WHERE userName ='" + userName + "'";
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
              const hash = crypto
                .createHmac("sha256", secret)
                .update(password)
                .digest("hex");
              // Do not print hashes
              // console.log(hash);
              let sql2 =
                "SELECT * FROM User WHERE userName ='" +
                userName +
                "' AND " +
                "password = '" +
                hash +
                "'";
              connection.query(sql2, function (err2, rows2, fields) {
                connection.release();
                if (err2) {
                  logger.error("Cannot find matching user: \n", err2);
                  res.status(400).json({
                    data: [],
                    error: "Error obtaining values",
                  });
                } else {
                  //returns 2 if the password is wrong
                  let response =
                    rows2.length > 0
                      ? {
                          status: 0,
                          userID: rows2[0].userID,
                          restaurantID: rows2[0].restaurantID,
                        }
                      : { status: 2 };
                  res.status(200).json(response);
                }
              });
            }
            //if the user doesn't exist
            else {
              res.status(200).json({ status: 1 });
            }
          }
        });
      }
    });
  });

  //GET /featured{restaurantID}
  //gets featured dishes of given restaurant
  app.get("/featured", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        let restaurantID = req.param("restaurantID");
        connection.query(
          "SELECT * FROM MenuItem WHERE restaurantID = ? AND featured = 1;",
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

  //POST Add a menuItem
  app.post("/addMenuItem", (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        let restaurantID = req.body["restaurantID"];
        let itemName = req.body["itemName"];
        let price = req.body["price"];
        let itemLink = req.body["itemLink"];
        let mealType = req.body["mealType"];
        let likes = req.body["likes"];
        let dislikes = req.body["dislikes"];
        let featured = req.body["featured"];
        let photo = req.body["photo"];
        let description = req.body["description"];
        let insert = [
          [
            restaurantID,
            itemName,
            price,
            itemLink,
            mealType,
            likes,
            dislikes,
            featured,
            photo,
            description,
          ],
        ];
        let sql =
          "INSERT INTO MenuItem(restaurantID, itemName, price, itemLink, mealType, likes, dislikes, featured, photo, description) VALUES ?";
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(sql, [insert], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into menuItem table: \n", err);
            res.status(400).send("Problem inserting into table");
          } else {
            res.status(200).send(`added ${req.body.itemName} to the table!`);
          }
        });
      }
      connection.release();
    });
  });

  //POST Add a review
  app.post("/addReview", (req, res) => {
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

  //PUT update all in MenuItem by itemID
  app.put("/updateMenuItem", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        let itemID = req.query["itemID"];
        let itemName = req.query["itemName"];
        let price = req.query["price"];
        let itemLink = req.query["itemLink"];
        let mealType = req.query["mealType"];
        let likes = req.query["likes"];
        let dislikes = req.query["dislikes"];
        let featured = req.query["featured"];
        let photo = req.query["photo"];
        let description = req.query["description"];
        // if there is no issue obtaining a connection, execute query
        connection.query(
          "UPDATE MenuItem SET itemName = (?), price = (?), itemLink = (?), mealType = (?), likes = (?), dislikes = (?), featured = (?), photo = (?), description = (?) WHERE itemID = (?)",
          [
            itemName,
            price,
            itemLink,
            mealType,
            likes,
            dislikes,
            featured,
            photo,
            description,
            itemID,
          ],
          (err, rows, fields) => {
            if (err) {
              logger.error("Error while updating MenuItem\n", err);
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
      connection.release();
    });
  });

  // GET /menuitem
  app.get("/menuitem", (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(
          "SELECT * FROM `PopStop`.`MenuItem`",
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


  // GET /user/{userID}
app.get("/user", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let userID = req.query["userID"];
      connection.query(
        "SELECT * FROM User WHERE userID = ?",
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


  app.use(restaurant);
};
