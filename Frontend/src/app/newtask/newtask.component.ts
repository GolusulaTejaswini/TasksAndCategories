import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private sampleService: ServiceService) { }

  addForm: FormGroup;
  private categories;
  ngOnInit() {
    this.sampleService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });


    this.addForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      taskdesc: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.addForm.value.status = false;
    console.log(this.addForm.value);

    this.sampleService.createTask(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['tasks']);
      });
  }
}