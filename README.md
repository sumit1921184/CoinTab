# CoinTab

## Introduction
This is a small website where we can fetch the user data using API and save this data to our database and also we can download in csv format.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://coin-tab.vercel.app/

Backend: https://cointab-yqqo.onrender.com/



## Directory Structure
my-app/
├─ backend/
├─ frontend/
│  ├─ style/
      ├─ index.css
    ├─ index.html
    ├─ post.html
    ├─ index.js
    ├─ post.js

## Video Walkthrough of the project
https://youtu.be/WvsuLlbw_NQ


## Features
Features of Application

- Fetch the data from the given API and display in the form of cards
- Add the particular user to the database by clicking on "add user" button.
- Add bulk data of a particular user's in database by clicking on "Add Bulk" button.
- Download the particular user's post by clicking on "Download Excel" button


## APIs Used
External API is used to fetch the data
- Link https://jsonplaceholder.typicode.com/
- Link https://cointab-yqqo.onrender.com/

## API Endpoints

- GET  https://jsonplaceholder.typicode.com/user - 
Get all the users
- GET https://jsonplaceholder.typicode.com/users/1 -
To get the particular user's post
- Get https://cointab-yqqo.onrender.com/user/1 - To get the particular user from the database
- GET https://cointab-yqqo.onrender.com/post/1 - To get partictlar user's post in database.
- POST https://cointab-yqqo.onrender.com/user/ - To add the user in database.
- POST https://cointab-yqqo.onrender.com/post/ - To add the paeticular user's post in database. 


## Technology Stack
Technologies used in the project
- Node.js
- Express.js
- Mysql
- HTML
- CSS
- Javascript