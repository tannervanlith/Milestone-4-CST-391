import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { taskLoader } from '../models/taskLoader';
import { userProfile } from '../models/userProfile';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})

export class ListTasksComponent implements OnInit {

  selectedTask: taskLoader = null;
  tasks: taskLoader[];

  constructor(private route: ActivatedRoute, private service: MusicServiceService, private router: Router) {}

  ngOnInit(): void { this.service.getTasks((tasks: taskLoader[]) =>{ this.tasks = tasks; })}

  public onSelectTask(task: taskLoader) { 
    this.selectedTask = task; 
    this.router.navigate(['display'], { queryParams: { task: task.tID } });
  }

}
