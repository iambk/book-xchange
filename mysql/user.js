const user = `create table if not exists User(ID INT PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(20) UNIQUE, FNAME VARCHAR(20), LNAME VARCHAR(20), BRANCH VARCHAR(5),SECTION VARCHAR(5),YEAR INT(11), Password BINARY(60), Reliability INT, Email VARCHAR(20) UNIQUE, Phone BIGINT);`;

module.exports = user;