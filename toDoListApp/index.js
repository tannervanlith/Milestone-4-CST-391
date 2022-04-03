// Application Dependencies
const { user, userProfile } = require('./lib/app/models/userProfile'); // class wont import properly!!
const { task, taskLoader } = require('./lib/app/models/taskLoader'); // class wont import properly!!
const { UserDAO: UserDAO } = require('./lib/app/database/UserDAO.js')
const { TaskDAO: TaskDAO } = require('./lib/app/database/TaskDAO.js')
const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 4000
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());

// Database configuration
const dbHost = "localhost"
const dbPort = 3306;
const dbUserName = "root"
const dbPassword = "root"

// Set location of static resources and use the JSON body parser
app.use(bodyParser.json());

// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res) {
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})

// GET Route at '/users' that returns all Users from the database
app.get('/users', function (_req, res) {
    // Return Users List as JSON, call UserDAO.findUsers(), and return JSON array of Users (a string)
    console.log('In GET /users Route');
    let dao = new UserDAO(dbHost, dbPort, dbUserName, dbPassword);
    dao.findUsers(function (users) {
        res.json(users);
    });
})

// GET Route at '/tasks' that returns all Tasks from the database
app.get('/tasks', function (req, res) {
    // Return Tasks List as JSON, call TaskDAO.findAllTasks(), and return JSON array of Tasks
    console.log('In GET /tasks Route ');
    let dao = new TaskDAO(dbHost, dbPort, dbUserName, dbPassword);
    dao.findAllTasks(function (tasks) {
        res.json(tasks);
    });
})

// Get retrieving a Task based on the task id choosen
app.get('/tasks/:id', function (req, res) {

    console.log('In GET /tasks Route with ID ' + req.params.id);
    let taskId = Number(req.params.id);

    let dao = new TaskDAO(dbHost, dbPort, dbUserName, dbPassword);
    dao.findTask(taskId, function (task) {
        if(task == null)
            res.status(200).json({"error" : "Invalid Task ID"})
        else
            res.status(200).json(task)
    });
})

// POST Route at '/users' that adds an User to the database
app.post('/users', function (req, res) {
    console.log(req);

    // If invalid POST Body then return 400 response else add User to the database
    console.log('In POST /users Route with Post of ' + JSON.stringify(req.body));
    if (!req.body.name) {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({ error: "Invalid User Posted" });
    }
    else {
        // Create an User object model from Posted Data
        let user = new userProfile(req.body.name, req.body.password, req.body.email);

        // Call UserDAO.create() to create an User from Posted Data and return an OK response    
        let dao = new UserDAO(dbHost, dbPort, dbUserName, dbPassword);
        dao.create(user, function (userID) {
            if (userID == -1)
                res.status(200).json({ "error": "Creating User failed" })
            else
                res.status(200).json({ "success": "Creating User passed with a User ID of " + userID });
        });
    }
})

// POST Route at '/tasks' that adds a Task to the database
app.post('/tasks', function (req, res) {
    console.log(req);

    // If invalid POST Body then return 400 response else add a Task to the database
    console.log('In POST /tasks Route with Post of ' + JSON.stringify(req.body));
    if (!req.body.task) {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({ error: "Invalid Task Posted" });
    }
    else {
        // Create an User object model from Posted Data
        let task = new taskLoader(req.body.class, req.body.task, req.body.dueDate, req.body.userID);

        // Call TaskDAO.create() to create an Task from Posted Data and return an OK response    
        let dao = new TaskDAO(dbHost, dbPort, dbUserName, dbPassword);
        dao.create(task, function (taskLoaderID) {
            if (taskLoaderID == -1)
                res.status(200).json({ "error": "Creating Task failed" })
            else
                res.status(200).json({ "success": "Creating Task passed with a taskLoaderID of " + taskLoaderID });
        });
    }
})

// PUT Route at '/users' that updates an User in the database
app.put('/users', function (req, res) {
    // If invalid PUT Body then return 400 response else update User to the database
    console.log('In PUT /users Route with Post of ' + JSON.stringify(req.body));
    if (!req.body.userID) {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({ error: "Invalid User Posted" });
    }
    else {
        // Create an User object model from Posted Data

        let user = new userProfile(req.body.userID, req.body.name, req.body.password, req.body.email);

        // Call userDAO.update() to update an User from Posted Data and return an OK response     
        let dao = new UserDAO(dbHost, dbPort, dbUserName, dbPassword);
        dao.update(user, function (changes) {
            if (changes == 0)
                res.status(200).json({ "error": "Updating User passed but nothing was changed" })
            else
                res.status(200).json({ "success": "Updating User passed and data was changed" });
        });
    }
})

// PUT Route at '/tasks' that updates an Task in the database
app.put('/tasks', function (req, res) {
    // If invalid PUT Body then return 400 response else update User to the database
    console.log('In PUT /tasks Route with Post of ' + JSON.stringify(req.body));
    if (!req.body.taskLoaderID) {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({ error: "Invalid Task Posted" });
    }
    else {
        // Create an Task object model from Posted Data
        let task = new taskLoader(req.body.taskLoaderID, req.body.class, req.body.task, req.body.dueDate, req.body.userID);

        // Call TaskDAO.update() to update an Task from Posted Data and return an OK response     
        let dao = new TaskDAO(dbHost, dbPort, dbUserName, dbPassword);
        dao.update(task, function (changes) {
            if (changes == 0)
                res.status(200).json({ "error": "Updating Task passed but nothing was changed" })
            else
                res.status(200).json({ "success": "Updating Task passed and data was changed" });
        });
    }
})

// DELETE Route at '/users/:id' that deletes an User given an User ID from the database
app.delete('/users/:id', function (req, res) {
    // Get the User
    console.log('In DELETE /users Route with ID of ' + req.params.userID);
    let userID = Number(req.params.id);

    // Call UserDAO.delete() to delete an User from the database and return if passed
    let dao = new UserDAO(dbHost, dbPort, dbUserName, dbPassword);
    dao.delete(userID, function (changes) {
        if (changes == 0)
            res.status(200).json({ "error": "Delete User failed" })
        else
            res.status(200).json({ "success": "Delete User passed" })
    });
})

// DELETE Route at '/tasks/:id' that deletes an Task given an taskLoaderID from the database
app.delete('/tasks/:id', function (req, res) {
    // Get the Task
    console.log('In DELETE /tasks Route with ID of ' + req.params.id);
    let taskLoaderID = Number(req.params.id);

    // Call TaskDAO.delete() to delete an Task from the database and return if passed
    let dao = new TaskDAO(dbHost, dbPort, dbUserName, dbPassword);
    dao.delete(taskLoaderID, function (changes) {
        if (changes == 0)
            res.status(200).json({ "error": "Delete Task failed" })
        else
            res.status(200).json({ "success": "Delete Task passed" })
    });
})

// Route code ends
// Start the Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
