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

-- create menu table
CREATE TABLE menu (
    menuID int(11) unsigned auto_increment not null,
    restaurantID int(11) unsigned,
    body varchar(250),
    rating int(11),
    primary key (menuID),
    foreign key (restaurantID) references restaurant(restaurantID)
);

-- create menuItem table
CREATE TABLE menuItem (
    itemID int(11) unsigned auto_increment not null,
    menuID int(11) unsigned not null,
    itemName varchar(50) not null,
    price double(6,2) not null,
    itemLink varchar(250),
    mealType varchar(50) not null,
    likes int(11) unsigned not null,
    dislikes int(11) unsigned not null,
    featured bool not null,
    photo varchar(250),
    descrip varchar(250),
    primary key (itemID),
    foreign key (menuID) references menu(menuID)
);

CREATE TABLE `PopStop`.`Restaurant` (
	`restaurantID` INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(restaurantID),
	`restaurantName` varchar(255),
	`menuID` INT(11),
	`ownerID` INT(11),
	`location` varchar(255),
	`hours` varchar(255),
	`description` varchar(1000),
	`cuisineType` varchar(255),
	`website` varchar(255),
	`sponsored` boolean,
	`socialMediaName` varchar(255),
	`socialMediaURL` varchar(255));

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');
INSERT INTO `db`.`Restaurant` (`restaurantName`, `menuID`, `ownerID`, `location`, `hours`, `description`, `cuisineType`, 
	`sponsored` bit,
	`socialMediaName` varchar(255),
	`socialMediaURL` varchar(255));


-- insert sample entry
INSERT INTO `PopStop`.`test_table` (`value`) VALUES ('Sample Value');
INSERT INTO `PopStop`.`Restaurant` (`restaurantName`, `menuID`, `ownerID`, `location`, `hours`, `description`, `cuisineType`, 
							`website`, `sponsored`, `socialMediaName`, `socialMediaURL`)
						VALUES
								('testName', 1, 1, 'testLoc', 'testHours', 'testDesc', 'testCuisine', 'testWeb',
								false , 'testSocName', 'testSocURL');


alter table Restaurant
add constraint menuID
foreign key(menuID)
references Menu (menuID);

-- sample insert into menu
INSERT INTO menu (restaurantID) VALUES ( 1 );

-- select * from Restaurant;

-- sample insert into menuItem
INSERT INTO menuItem (menuID, itemName, price, mealType, likes, dislikes, featured) VALUES ( 1, 'Bruschetta', 10, 'Italian', 0, 0, false );
