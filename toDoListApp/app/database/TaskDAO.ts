import { taskLoader } from "../models/taskLoader";
import * as mysql from "mysql";
import * as util from "util";

export class TaskDAO {
    private host: string = "";
    private port: number = 3306;
    private username: string = "";
    private password: string = "";
    private schema: string = "toDoList";
    private pool = this.initDbConnection();


    constructor(host: string, port: number, username: string, password: string) {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }

    public findAllTasks(callback: any) {
        // List of Tasks to return
        let tasks: taskLoader[] = [];

        // Get a pooled connection to the database, run the query to get all the distinct taskLoaderID, and return the List of Tasks
        this.pool.getConnection(function (err: any, connection: any) {
            // Throw error if an error
            if (err) throw err

            // Run query    
            connection.query('SELECT distinct * FROM taskLoader', function (err: any, rows: any, fields: any) {
                // Release connection in the pool
                connection.release();

                // Throw error if an error
                if (err) throw err

                // Loop over result set and save the Task in the List of Tasks
                for (let x = 0; x < rows.length; ++x) {
                    tasks.push(new taskLoader(rows[x].taskLoaderID, rows[x].class, rows[x].task, rows[x].dueDate, rows[x].userID));
                }

                // Do a callback to return the results
                callback(tasks);
            });

        });
    }

    public findTask(taskID:number, callback: any) {
        // Get a pooled connection to the database, run the query to get all the distinct taskLoaderID, and return the List of Tasks
        this.pool.getConnection(async function (err:any, connection:any) {
            // Release connection in pool
            connection.release();
            // Throw error if an error
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM taskLoader WHERE taskLoaderID=?', [taskID]);
            if(result1.length != 1)
                callback(null);

            let task = new taskLoader(result1[0].taskLoaderID, result1[0].class, result1[0].task, result1[0].dueDate, result1[0].userID); 
            callback(task);

        });
    }

    public create(task: taskLoader, callback: any) {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function (err: any, connection: any) {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert Task
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO taskLoader (class, task, dueDate, userID) VALUES(?,?,?,?)', [task.tID, task.CLASS, task.TASK, task.DUEDATE, task.ID]);
            if (result1.affectedRows != 1)
                callback(-1);

            // Do a callback to return the results
            callback(result1.affectedRows);
        });
    }

    public update(task: taskLoader, callback: any) {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function (err: any, connection: any) {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and update Task
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE taskLoader SET class=?, task=?, dueDate=?, userID=? WHERE taskLoaderID=?', [task.CLASS, task.TASK, task.DUEDATE, task.ID, task.tID]);
            if (result1.changedRows != 0)
                ++changes;

            // Do a callback to return the results
            callback(changes);
        });
    }

    public delete(taskLoaderID:number, callback:any) {
        console.log("in taskDAO delete")
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function (err:any, connection:any) {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // // Use Promisfy Util to make an async function and run query to delete the tasks for the User
            let changes = 0;

            // Use Promisfy Util to make an async function and run query to delete the Task
            let result2 = await connection.query('DELETE FROM taskLoader WHERE taskLoaderID=?', [taskLoaderID]);
            changes = changes + result2.affectedRows;

            // Do a callback to return the results
            callback(changes);
        });
    }


    /* **************** Private Helper Methods **************** */
    /**
     * Private helper method to initialie a Database Connection
     */
    private initDbConnection(): any {
        return mysql.createPool({ host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10 });
    }
}
