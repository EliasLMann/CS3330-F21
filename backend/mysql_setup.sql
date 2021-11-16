-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create table in db
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

<<<<<<< Updated upstream
CREATE TABLE `db`.`Restaurant` (
=======
CREATE TABLE `PopStop`.`Restaurant` (
>>>>>>> Stashed changes
	`restaurantID` INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(restaurantID),
	`restaurantName` varchar(255),
	`menuID` INT(11),
	`ownerID` INT(11),
	`location` varchar(255),
	`hours` varchar(255),
	`description` varchar(1000),
	`cuisineType` varchar(255),
	`website` varchar(255),
<<<<<<< Updated upstream
	`sponsored` boolean,
	`socialMediaName` varchar(255),
	`socialMediaURL` varchar(255));

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');
INSERT INTO `db`.`Restaurant` (`restaurantName`, `menuID`, `ownerID`, `location`, `hours`, `description`, `cuisineType`, 
=======
	`sponsored` bit,
	`socialMediaName` varchar(255),
	`socialMediaURL` varchar(255));


-- insert sample entry
INSERT INTO `PopStop`.`test_table` (`value`) VALUES ('Sample Value');
INSERT INTO `PopStop`.`Restaurant` (`restaurantName`, `menuID`, `ownerID`, `location`, `hours`, `description`, `cuisineType`, 
>>>>>>> Stashed changes
							`website`, `sponsored`, `socialMediaName`, `socialMediaURL`)
						VALUES
								('testName', 1, 1, 'testLoc', 'testHours', 'testDesc', 'testCuisine', 'testWeb',
								false , 'testSocName', 'testSocURL');
<<<<<<< Updated upstream
							
=======

alter table Restaurant
add constraint menuID
foreign key(menuID)
references Menu (menuID);

>>>>>>> Stashed changes
-- select * from Restaurant;


