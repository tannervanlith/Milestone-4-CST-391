import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { DisplayTaskComponent } from './display-task/display-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';

const routes: Routes = [
  {path: 'list-tasks', component: ListTasksComponent},
  {path: 'display', component: DisplayTaskComponent},
  {path: 'create', component: CreateTaskComponent},
  {path: 'edit/:id', component: EditTaskComponent},
  {path: 'delete/:id', component: DeleteTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
