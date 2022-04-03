import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { taskLoader } from '../models/taskLoader';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskCount: number;

  constructor(private service: MusicServiceService, private router: Router) { }

  ngOnInit(): void { }

  appForm = new FormGroup({ a1: new FormControl(''),  a2: new FormControl(''),  a3: new FormControl('') });
  q1 = "Enter your new task title: "
  a1 = "unknown"
  q2 = "Enter the class for your new task: "
  a2 = "unknown"
  q3 = "Enter the duedate of this new task: "
  a3 = "unknown"

  onSubmit(data: { a1: string; a2: string; a3: string}) {
    console.log("The New Album Title is " + data.a1);
    this.service.getTasks((returnedTasks: taskLoader[]) => {

      this.taskCount = returnedTasks.length;

      let newTask = new taskLoader(this.taskCount + 1, data.a2, data.a1, data.a3, 17)
      this.service.createTask(newTask, (data: number) => {

        if(data == 0) {

          alert("The task did not get created...")
        }
        else {

          alert("Task was successfully created")
          this.router.navigate(['list-tasks'], { queryParams: { data: new Date()}});
        }
      });
    });
  }

}
