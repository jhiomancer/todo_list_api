# todo_list_api

## [REST API for todo list app]

## Requirements
Create an API for managing a TODO list with the following specification:
- Register
    - The user should be able to register with a username and password
    - Usernames must be unique across all users
- Login
    - The user should be able to log in with the credentials they provided in the register endpoint
    - Should return an access token that can be used for the other endpoints
- TODO List
    - The user should only be able to access their own tasks
    - The user should be able to list all tasks in the TODO list
    - The user should be able to add a task to the TODO list
    - The user should be able to update the details of a task in their TODO list
    - The user should be able to remove a task from the TODO list
    - The user should be able to reorder the tasks in the TODO list (not completed)
    - A task in the TODO list should be able to handle being moved more than 50 times (not completed)
    - A task in the TODO list should be able to handle being moved to more than one task away from its current position (not completed)
* Return proper errors with corresponding HTTP codes
* Note: You can think of this as an API endpoint that will be used to handle the drag and drop feature of a TODO list application.

All endpoints should return JSON responses.


## Prerequisites
* [Node.js](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/downloads/installer/) Installation Guide: https://www.youtube.com/watch?v=N3B3OonC2AU&t=304s
* [Code Editor of your Choice ( I used Microsoft Visual Studio Code)](https://code.visualstudio.com/download)
* [Postman (For testing API endpoints)](https://www.postman.com/downloads/)


## Modules

**User Module:** This module contains all API endpoints for User Registration and User Login

**API endpoints for User Module:**
    
* **/api/user/register:** To register a new user (method: POST)
* **/api/user :** To get all users (method : GET)
* **/api/user/login :** To login a user (method : POST)

**Todos Module:** This module contains all API endpoints for Creating, Listing, Updating, Removing todo

**API endpoints for Todo Module:**

* **/api/todo/create:** To create a new todo for a specific user ( method : POST)
* **/api/todo :** To get all todos or tasks for a user (method : GET)
* **/api/todo/:todo_id :** To get a specific todo for a user (method : GET)
* **/api/todos/update/:todo_id :** To update a todo by todo_id for a user ( method : POST)
* **/api/todos/remove/:todo_id :** To remove a todo for a user ( method: DELETE)
* **/api/todos/remove :** To remove all todo for a user ( method: DELETE)

## Database(MySQL)
 
```
    CREATE TABLE IF NOT EXISTS `users` (
    `user_id` int(20) unsigned NOT NULL auto_increment,
    `user_username` varchar(50) NOT NULL,
    `user_password` varchar(64) NOT NULL,
    `user_create_dt` datetime NOT NULL default CURRENT_TIMESTAMP,  
    PRIMARY KEY (`user_id`),
    INDEX `i_user_key` (`user_username`)
    ) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
    
    CREATE TABLE IF NOT EXISTS `todos` (
    `todo_id` int(20) unsigned NOT NULL auto_increment,
    `user_id` int(20) NOT NULL REFERENCES `users`(`user_id`),
    `todo_name` varchar(60) NOT NULL,
    `todo_description` varchar(150) NULL,
    `todo_create_dt` datetime NOT NULL default CURRENT_TIMESTAMP,  
    `index_number` int(20) NULL,
    PRIMARY KEY (`todo_id`),
    INDEX `i_todo_key` (`todo_name`,`todo_id`)
    ) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
```

## Installation 
    
```
    # Clone repository into local machine
    
    git clone git@github.com:jhiomancer/todo_list_api.git todo_list

    # Go to todo_list dir
    
    cd todo_list 

    # Install Required Dependencies listed in package.json to successfully run the application
    
    npm i or npm install 

    # Create .env file in root todo_list dir

    vi .env

    Add the ff. variables in the .env file: 
    
    DB_NAME = /* provide your database name */
    DB_HOST = /* provide your host name */
    DB_USER = /* provide your database user name */
    DB_PASSWORD = /* provide your database password name */
    PORT = /* provide your port number to run express server */
    JWT_KEY = /* define a random key here */

    Save the file.

    # Start the server
    
    npm run start

```




