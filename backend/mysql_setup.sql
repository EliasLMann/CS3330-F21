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

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');

-- sample insert into menu
INSERT INTO menu (restaurantID) VALUES ( 1 );

-- sample insert into menuItem
INSERT INTO menuItem (menuID, itemName, price, mealType, likes, dislikes, featured) VALUES ( 1, 'Bruschetta', 10, 'Italian', 0, 0, false );
