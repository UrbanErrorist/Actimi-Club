# Actimi Club App ![Alt Text](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B)


This webapp is created for Actimi Sağlık Ar&Ge. 

The Frontend of the app is created using React.js and backend of the app is developed using mongoDB, Nodejs, Express.js, and mongoose. 
 ![Alt Text](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Alt Text](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B)  ![Alt Text](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 

## ScreenShots
 
![Alt Text](./actimi.gif)



## Installation 

Installation of node and npm and mongodb is required to run this project 

* Start MongoDB server  

```bash 
mongod 
``` 

* Install the dependencies 

```bash 
git clone https://github.com/UrbanErrorist/Actimi-Club.git
cd Actimi-Club
cd backend 
npm install 
cd .. 
cd frontend 
npm install
 ``` 

* Run server 

```bash 
cd backend 
node server.js 
cd .. 
cd frontend 
npm start 
``` 

## Features 

### Frontend 

* Ability to register and login users.
* After logging in, the manager can add, edit and delete the club members. 
* There is aditional feature of profile pic added to the project. Each member will have a profile picture.
* User can search club members by name. 
* Axios was used to create HTTP calls. 

### Backend 
* API was developed using Node and Express to log in and register users. 
* API saves the user information in MongoDB server. 
* API provides services like add, delete, edit club members to users. 
* Pagination API is used to list the club members. 
* JWT token authentication was used.


## Comments

* Please make sure that mongodb is running before staring node server.js
* Node server is listening to port 2000. After node is connected to Mongodb this meesage will be loged - "Mongodb connected! Server is Runing On port 2000"
* Please make sure node server.js is running before starting the react server.
* React will run on default port http://localhost:3000.
