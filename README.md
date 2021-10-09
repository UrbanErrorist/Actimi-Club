# Actimi Club App 

This webapp is created for Actimi Sağlık Ar&Ge. 

The Frontend of the app is created using React.js and backend of the app is developed using mongoDB, Nodejs, Express.js, and mongoose. 

## Installation 

Installation of node and npm and mongodb is required to run this project 

* Start MongoDB server 

```bash 
mongod 
``` 

* Install the dependencies 

```bash 
git clone https://github.com/UrbanErrorist/Actimi-Club.git
cd actimi-club 
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
* User can search club members by name. 
* Axios was used to create HTTP calls. 

### Backend 
* API was developed using Node and Express to log in and register users. 
* API saves the user information in MongoDB server. 
* API provides services like add, delete, edit club members to users. 
* Pagination API is used to list the club members. 
* JWT token authentication was used.

## ScreenShots
 
![Alt Text](./actimi.gif)
