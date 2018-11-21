const user = 'create table User(ID INT PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(20) UNIQUE, FNAME VARCHAR(20), LNAME VARCHAR(20), BRANCH VARCHAR(5),SECTION VARCHAR(5),YEAR INT(11), Password BINARY(60), Reliability INT, Email VARCHAR(20) UNIQUE, Phone BIGINT);';

const category = 'create table Category(CategoryID INT PRIMARY KEY, CategoryName VARCHAR(20), SubCategoryName VARCHAR(20));';
 
const book = 'create table Book(BookID CHAR(10) DEFAULT '0000', Title VARCHAR(20), Author VARCHAR(20), ID INT, XchangeType INT, Cond INT, CategoryID INT, PRIMARY KEY (BookID), FOREIGN KEY (ID) REFERENCES User(ID), FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID));';

const SearchTitleAuthor = (Title, Author) =>  
{ 
	const search_title_author = 'select * from book where Title=$(Title) and Author=$(Author);';
}; 
