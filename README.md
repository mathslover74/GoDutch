# GoDutch

## Application Description
This is a bill spilting app that tracks spendings between friends/family.

## Table of Content
- [Links](#Links)
- [Database/Storage](#Database/Storage)
- [Technologies](#Technologies)
- [Objective](#Objective)
- [Approaches Taken](#Approaches-taken)
- [Accomplishments](#Accomplishments)
- [Difficulties faced](#Difficulties-faced)
- [Wireframe Design and User Stories](#Wireframe-Design-and-User-Stories)
- [RESTful Routes](#RESTful-Routes)
- [Additional Features were under Considerations](#Additional-Features-were-under-Considerations)
- [Credits](#Credits)

## Links
- [Application Link](https://go-dutch-project2.herokuapp.com/)

## Database/Storage
* **MongoDB** is a document-oriented database which stores data in JSON-like documents with dynamic schema. 

## Technologies
* **EJS** is used to generate HTML with plain javascript to append to frontend.
* **Method-override** is used to to convert HTTP verbs such as PUT or DELETE in places where the client doesn't support i
* **Bcrypt** is used to hash and store passwords in database
* **Express is a back end web application framework for Node.js
* **Express-session** is used to store the user state with each given being assigned a unique session.
* **Dotenv** is a zero-dependency module that loads environment variables. It allows you to separate secrets from source code.
* **Bootstrap Material Design** is used for CSS framework for HTML and CSS design templates
* **Materializecss** s used for CSS framework for HTML and CSS design templates


## Objective
* Make a full **CRUD** (Create, Read, Update and Delete) using 
**Node.js**, **MongoDB**, **Express** and **EJS** and adheres to **MVC** (Models, Views, and Controllers) file structure.

## Approaches Taken
* Come up with Wire Frame design
* Built authentication page
* Linked the app to heroku
* Set up database with collections and schema validation in the MongoDB
* Set up a basic MVC structure with basic CRUD routes.
* Test function

## WireFrame

- Intro
(img/intro.png)

- SignUp
(img/SignUp.png)

- LoginError
(img/LoginError.png)

- Login
(img/Login.png)

- Dashboard
(img/Dashboard.png)

- Show
(img/Login.png)

## Accomplishments
* The application is meeting the minimum viable product (MVP)'s requirements.
* User to be able to create friends, add expenses for tracking, view owing and view settled amount.
* Filter to login user's data only

## Difficulties faced
- Often get confuse for linkage when start the project and during writing of code.
- How to filter data that is created by login users. when start it shows all data created by users.

## RESTful Routes

| No. | Route   | URL                 | HTTP Verb | Description                                                                      |
| --- | ------- | -----------------   | --------- | -------------------------------------------------------------------------------- |
| 1.  | Index   | /                   | GET       | Intro to the page                                                                |
|     |         | /expenses/dashboard | GET       | Dashboard                                                                        |
| 2.  | New     | /sessions/new       | GET       | Log In Form                                                                      |
|     |         | /sessions/invalid   | GET       | Log In Form                                                                      |
|     |         | /users/new          | GET       | Sign Up Form                                                                     |
|     |         | /expenses/new       | GET       | Add New Expenses                                                                 |
| 3.  | Create  | /sessions           | POST      | Authenticates database and redirect to intro else show /session/invalid          |
|     |         | /users              | POST      | Create new user into database and redirect to /session/new                       |
|     |         | /expenses           | POST      | Creates new expenses and redirect to /expenses                                   |
| 4.  | Show    | /expenses/:id       | GET       | Displays expenses details                                                        |
| 5.  | Edit    | /expenses/:id/edit  | GET       | Edit Form - Show Information and expenses of details                             |
| 6.  | Update  | /expenses/:id       | PUT       | Updates show and redirects to show entry                                         |
| 7.  | Destroy | /sessions           | DELETE    | Destroys session and redirect to /                                               |
|     |         | /expenses/:id       | DELETE    | Deletes requested show in database and redirects to Dasboard                     |

## Additional Features were under Considerations
<!-- * **Notifications** - application to send notifcation to user when there is another user commented on image, add new image to the album, followed album has new image, has new follower, etc. 
* **Enhance Users Database** - to get more users profile into the database like profile picture, email address, gender, age, biodata, etc. 
* **Like feature for image** - to have a like button for individual image -->

## Credits
<!-- * All the **alpha trials users** and **fellow coursemates**  -->

