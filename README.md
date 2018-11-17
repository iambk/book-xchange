# xBook
A book exchange platform as part of mini project for application software development lab, Sem 5.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

| Prerequisite                                  | Version |
| ----------------------------------------------| ------- |
| [Node.js](http://nodejs.org)                  | `8.x`   |
| [yarn](https://yarnpkg.com/en/) (recommended) | `1.x`   |

As an alternative you can also use npm

#### Recommended workflow
1. Fork this repository
2. Clone the forked repository in your local machine
  > Via ssh
  ```shell
  git clone git@github.com:<your_user_name>/x-book.git
  ```

  > Via https
  ```shell
  git clone https://github.com/<your_user_name>/boox-xchange.git
  ```


3. Change directory to the newly cloned x-book directory:
  ```shell
  cd x-book
  ```

4. To maintain your fork with the upstream, add a remote to the main x-book repository:
  > Via ssh
  ```shell
  git remote add upstream git@github.com:iambk/x-book.git
  ```

  > Via https
  ```shell
  git remote add upstream https://github.com/iambk/boox-xchange.git
  ```

5. Please create a branch and work on it to keep the workflow clean.

### Setting up the project locally
1. To install all the package dependencies, run the following command from the cloned x-book directory:
> Via yarn (recommended)
```shell
yarn
```
> Via npm
```shell
npm install
```

2. Create an .env file with your local mysql database details in the following format:
```shell
PORT=3000
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=
```

  > .env is a shell file so there can't be spaces around =

3. Start the server and navigate to localhost:3000 or localhost:port-number-you-gave in your browser

Starting the server

> Using yarn
```shell
yarn start
```

> Using npm 
```shell
npm start
```


