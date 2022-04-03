import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { taskLoader } from '../models/taskLoader';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {

  task: taskLoader = new taskLoader(-1,"","","",-1);

  constructor(private route: ActivatedRoute, private service: MusicServiceService, private router: Router) { }

  ngOnInit(): void { 
    this.route.queryParams.subscribe((params) => {
      this.service.getTask(params['task'], (task:taskLoader) => {
        this.task = task; 
      })
  });
  }

  
}
