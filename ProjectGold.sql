CREATE SCHEMA `ProjectGold` ;

CREATE TABLE `ProjectGold`.`Applications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `club` VARCHAR(250) NOT NULL,
  `makesYou` TEXT(2500) NOT NULL,
  `teamMembers` TEXT(500) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `ProjectGold`.`Applications` (`fullName`, `email`, `phone`, `club`, `makesYou`, `teamMembers`) VALUES ('Brandon Chow', 'me@branchow.com', '6479903639', 'Club Swag', 'Max Swag', 'Douglas, tommy');