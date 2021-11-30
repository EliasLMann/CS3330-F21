const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const pool = require("../db");

// for user story 1.7
// GET meal types and the associated IDs
router.get("/getmealtypes", (req, res) => {
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

//get the top menu items of a given restaurant
// GET /topmenuitem{resaurantID}
router.get("/topmenuitem", (req, res) => {
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
        "SELECT * FROM `PopStop`.`MenuItem` where restaurantID = ? order by (likes - dislikes) desc limit 5",
        [restaurantID],
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

//GET /menuItems{restaurantID}
//gets menuItems by restaurantID
router.get("/menuItem", (req, res) => {
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
        "SELECT * FROM MenuItem WHERE restaurantID = (?) ORDER BY mealType ASC;",
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
router.post("/postmenuitem", (req, res) => {
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
router.put("/updateitem", (req, res) => {
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
router.put("/updateitemlink", (req, res) => {
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
router.get("/menuitem", (req, res) => {
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

// for user story 6.2
// UPDATE /updatemealtype/{itemID} for particular menuItem
router.put("/updatemealtype", (req, res) => {
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
router.put("/updatelikes", (req, res) => {
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
router.put("/updatedislikes", (req, res) => {
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
router.put("/incrementlikes", (req, res) => {
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
router.put("/incrementdislikes", (req, res) => {
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

// for user story 6.2
// UPDATE /updatedescription/{itemID} for particular menuItem
router.put("/updatedescription", (req, res) => {
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
router.delete("/deleteitem", (req, res) => {
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
router.put("/removeprice", (req, res) => {
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
// UPDATE /updatefeatured/{itemID} for particular menuItem
router.put("/updatefeatured", (req, res) => {
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

// user story 4.1
// UPDATE MenuItem to change photo
// takes itemID and updates photo url
router.put("/updateitemphoto", (req, res) => {
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
        "UPDATE MenuItem SET photo = ? WHERE itemID = ?",
        [photoNew, itemID],
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

//GET /featured{restaurantID}
//gets featured dishes of given restaurant
router.get("/featured", (req, res) => {
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

// GET /menuitem
router.get("/menuitem", (req, res) => {
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

module.exports = router;
