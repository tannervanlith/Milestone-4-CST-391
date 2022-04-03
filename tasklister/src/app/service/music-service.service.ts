import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { taskLoader } from '../models/taskLoader';
import { userProfile } from '../models/userProfile';

@Injectable({providedIn: 'root'})

export class MusicServiceService {

  hostname: String = "http://localhost:4000";

  constructor(private http: HttpClient){}

  public getTasks(callback:any){
    this.http.get<taskLoader[]>(this.hostname + "/tasks")
      .subscribe((data) => {
        let tasks:taskLoader[] = [];
        for(let x=0; x<data.length; ++x){
          tasks.push(new taskLoader(data[x]['taskLoaderID'], data[x]['class'], data[x]['task'], data[x]['dueDate'], data[x]['userID']));
        }
        callback(tasks);
    });
  }

  public getTask(id:number, callback:any){
    this.http.get<taskLoader>(this.hostname + "/tasks/" + id)
      .subscribe((data) => {
        let task:taskLoader = new taskLoader(data['taskLoaderID'],
            data['class'],
            data['task'],
            data['dueDate'],
            data['userID']);
        callback(task);
      });
  }

  public createTask(task:taskLoader, callback:any){
    this.http.post<taskLoader>(this.hostname + "/tasks", task)
    .subscribe((data) => {
      callback(data);    
    });
  }

  public updateTask(task: taskLoader, callback:any){
    this.http.put<taskLoader>(this.hostname + "/tasks", task)
    .subscribe((data) => {
      callback(data);
    });
  }

  public deleteTask(id:number, callback:any){
    this.http.delete(this.hostname + "/tasks/" + id)
    .subscribe((data) => {
      callback(data);
    });
  }

}
