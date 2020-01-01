import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private tasks;
  private htmltasks;
  private categories;
  constructor(private sampleService: ServiceService, private router: Router) { }

  ngOnInit() {
    this.sampleService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
    this.sampleService.getTasks().subscribe(data => {
      this.tasks = data;
      this.htmltasks = data;
      console.log(this.tasks);
    });
  }
  deleteTask(task): void {
    this.sampleService.deleteTask(task)
      .subscribe(data => {
        console.log(data);
      });
    window.location.reload();
  };
  editTask(task): void {
    this.router.navigate(['edittask', task._id]);
  };

  addTask(): void {
    this.router.navigate(['newtask']);
  };
  addTaskCategory(event, task) {
    console.log(event);
    console.log(task);
    this.sampleService.addTaskToCategory(event, task)
      .subscribe(
        data => {
          console.log(data);
          if (data = "Added Successfully")
            this.router.navigate(['categories']);
        });
  }
  sortByStatus(event: any) {
    console.log(event);
    if (event == "false") {
      this.htmltasks = this.tasks.filter(function (task) {
        return task.status == false;
      });
    }
    else if (event == "true") {
      this.htmltasks = this.tasks.filter(function (task) {
        return task.status == true;
      });
    }
    else
      this.htmltasks = this.tasks;
  }
  sortByDate(event) {
    console.log(event);
    this.tasks.sort((val1, val2) => {
      return <any> new Date(val1.date) - <any> new
        Date(val2.date)
    })
    console.log(this.tasks);
  }
}