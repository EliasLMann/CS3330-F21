const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const pool = require("../db");

//======================================= GET ===========================================
router.get("/restaurants", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT * FROM Restaurant",
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

// GET /restaurant/{restaurantID}
router.get("/restaurant", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let restaurantID = req.query["restaurantID"];
      connection.query(
        "SELECT * FROM Restaurant WHERE restaurantID = ?",
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

//GET /restaurants/byLocation{location}
//gets restaurants by location
router.get("/restaurants/byLocation", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var location = req.param("location");
      connection.query(
        "SELECT * FROM Restaurant WHERE location ='" + location + "'",
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

//GET /restaurants/byCuisine{cuisineType}
//gets restaurants by cuisineType
router.get("/restaurants/byCuisineType", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var cuisineType = req.param("cuisineType");
      connection.query(
        "SELECT * FROM Restaurant WHERE cuisineType ='" + cuisineType + "'",
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

//GET /restaurants/{mealType}
//gets restaurants by mealType served
router.get("/restaurants/byMealType", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var mealType = req.param("mealType");
      connection.query(
        "SELECT r.* FROM Restaurant r JOIN MenuItem m ON r.restaurantID = m.restaurantID WHERE mealType = (?)",
        mealType,
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

//GET /restaurants/avgRating{lowRating, highRating}
//gets restaurants with avg rating in range
router.get("/restaurants/avgRating", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var lowRating = req.param("lowRating");
      var highRating = req.param("highRating");
      connection.query(
        "SELECT r.*, AVG(rating) FROM Restaurant r JOIN Review re ON r.restaurantID = re.restaurantID GROUP BY r.restaurantID HAVING AVG(rating) BETWEEN (?) AND (?);",
        [lowRating, highRating],
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

//GET /restaurants/avgPrice{lowPrice, highPrice}
//gets restaurants with avg price in range
router.get("/restaurants/avgPrice", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      var lowPrice = req.param("lowPrice");
      var highPrice = req.param("highPrice");
      connection.query(
        "SELECT r.*, AVG(price) FROM Restaurant r JOIN MenuItem m GROUP BY m.restaurantID HAVING AVG(price) BETWEEN (?) AND (?);",
        [lowPrice, highPrice],
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

//GET all sponsored restaurants
router.get("/restaurants/sponsored", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT * FROM `PopStop`.`Restaurant` WHERE sponsored = 1",
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

//GET all restaurant locations
router.get("/restaurant/locations", (req, res) => {
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

// GET all restaurantNames
router.get("/restaurant/restaurantNames", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT restaurantName FROM `PopStop`.`Restaurant`",
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

//GET all restaurant hours
router.get("/restaurant/hours", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT hours FROM `PopStop`.`Restaurant`",
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

//GET all restaurant descriptions
router.get("/restaurant/descriptions", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT description FROM `PopStop`.`Restaurant`",
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

//GET all restaurant cuisineTypes
router.get("/restaurant/cuisineTypes", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT cuisineType FROM `PopStop`.`Restaurant`",
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

//GET all restaurant websites
router.get("/restaurant/websites", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT website FROM `PopStop`.`Restaurant`",
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

//GET all restaurant socialMediaNames
router.get("/restaurant/socialMediaNames", (req, res) => {
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(
        "SELECT socialMediaName FROM `PopStop`.`Restaurant`",
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

//=============================================== POST =======================================

// POST Add restaurant
router.post("/addRestaurant", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      let restaurantName = req.query["restaurantName"];
      let location = req.query["location"];
      let hours = req.query["hours"];
      let description = req.query["description"];
      let cuisineType = req.query["cuisineType"];
      let website = req.query["website"];
      let sponsored = req.query["sponsored"] == "true";
      let socialMediaName = req.query["socialMediaName"];
      let socialMediaURL = req.query["socialMediaURL"];
      let insert = [
        [
          restaurantName,
          location,
          hours,
          description,
          cuisineType,
          website,
          sponsored,
          socialMediaName,
          socialMediaURL,
        ],
      ];
      let sql =
        "INSERT INTO Restaurant(restaurantName, location, hours, description, cuisineType, website, sponsored, socialMediaName, socialMediaURL) VALUES ?";
      // if there is no issue obtaining a connection, execute query and release connection
      connection.query(sql, [insert], function (err, rows, fields) {
        connection.release();
        if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem inserting into Restaurant table: \n", err);
          res.status(400).send("Problem inserting into table");
        } else {
          res.status(200).send(`added ${restaurantName} to the table!`);
        }
      });
    }
  });
});

//================================================= PUT =============================================

//PUT sponsored of restaurant
//Updates sponsored status of given restaurant
router.put("/updateSponsored", (req, res) => {
  console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error("Problem obtaining MySQL connection", err);
      res.status(400).send("Problem obtaining MySQL connection");
    } else {
      // if there is no issue obtaining a connection, execute query and release connection
      let sponsored = req.param("sponsored");
      let restaurantID = req.param("restaurantID");
      let sql = "";
      console.log(sponsored);
      if (sponsored == "true") {
        sql = "UPDATE Restaurant SET sponsored = 1 WHERE restaurantID = ?";
      } else if (sponsored == "false") {
        sql = "UPDATE Restaurant SET sponsored = 0 WHERE restaurantID = ?";
      }
      connection.query(sql, [restaurantID], function (err, rows, fields) {
        connection.release();
        if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem updating Restaurant table: \n", err);
          res.status(400).send("Problem updating table");
        } else {
          res
            .status(200)
            .send(`Updated Restaurant ${req.param("restaurantID")}'s value!`);
        }
      });
    }
  });
});

module.exports = router;
