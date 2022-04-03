import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { taskLoader } from '../models/taskLoader';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {

  task: taskLoader = new taskLoader(-1,"","","",-1);

  constructor(private service: MusicServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { 
    this.service.getTask(this.route.snapshot.paramMap.get('id') as unknown as number,(returnedTask: taskLoader)=> {
      this.task = returnedTask;
    });
  }

  appForm = new FormGroup({ a1: new FormControl(''),  a2: new FormControl(''),  a3: new FormControl('')  });
  q1 = "Enter a new Title: "
  a1 = "Unknown"
  q2 = "Enter a new class for the Task: "
  a2 = "Unknown"
  q3 = "Enter a new duedate for the Task: "
  a3 = "Unknown"


  onSubmit(data: { a1: string; a2: string; a3: string}) {
    let newTask: taskLoader = this.task;
    newTask.TASK = data.a1;
    newTask.CLASS = data.a2;
    newTask.DUEDATE = data.a3;    
    this.service.updateTask(newTask, (changes: number) => {
      if(changes == 0) alert("Update Task Failed...");
      else {
        alert("Update Task was Successful...")
        this.router.navigate(['list-tasks'], { queryParams: { data: new Date()}});
      }
    }); 
  };


}
