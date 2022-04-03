import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  constructor(private router: Router, private service: MusicServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.deleteTask(this.route.snapshot.paramMap.get('id') as unknown as number,(changes: number) => {
    if(changes == 0) alert("Delete Task Failed...");
    else alert("Delete Task was Successful...");  
    })
  }

  displayTaskList(){
    this.router.navigate(['list-tasks'], { queryParams: { data: new Date()}});
  }

}
