import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.css']
})
export class NewcategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private sampleService: ServiceService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDesc: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.sampleService.createCategory(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['categories']);
      });
  }

}
