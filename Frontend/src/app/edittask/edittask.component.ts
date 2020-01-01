import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  constructor(  private route: ActivatedRoute,
    private formBuilder: FormBuilder,private router: Router, private sampleService: ServiceService) { }
  editForm: FormGroup;
  id: any;
  private sub: any;
  private tasks:any;
  private checked;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id);
   });
   console.log(this.route);
   console.log(this.id);
   this.sampleService.getTaskbyID(this.id).subscribe(data =>
    {
      this.tasks=data[0];
      console.log(this.tasks);
    });
    this.editForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      taskdesc: ['', Validators.required],
      category: ['', Validators.required],
      status:new FormControl('', [Validators.required])
        });
  }
checkValue(event) {
  console.log(event);
  this.checked=event;
}
  onSubmit() {
    var task=this.tasks;
    console.log(this.editForm.value);
    task.taskname=this.editForm.value.taskname;
    task.status=this.editForm.value.status;
    delete task._id;

    console.log(task);

    this.sampleService.updateTask(task,this.id)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(data="Updated Successfully")
          this.router.navigate(['tasks']);
        });
  }
}