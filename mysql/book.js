const book = `create table if not exists Book(BookID INT AUTO_INCREMENT, Title VARCHAR(20), Author VARCHAR(20), ID INT, XchangeType INT, Cond INT, CategoryID INT, PRIMARY KEY (BookID), FOREIGN KEY (ID) REFERENCES User(ID), FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID));`;

module.exports = book;