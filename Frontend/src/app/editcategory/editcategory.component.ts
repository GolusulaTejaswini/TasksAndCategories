import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router, private sampleService: ServiceService) { }
  editForm: FormGroup;
  id: any;
  private sub: any;
  private category;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    console.log(this.id);

    console.log(this.route);
    this.sampleService.getCategorybyID(this.id).subscribe(data => {
      this.category = data[0];
      console.log(JSON.parse(this.category));
    });
    this.editForm = this.formBuilder.group({
      category: ['', Validators.required]
    });
  }
  checkValue(event) {
    console.log(event);
  }
  onSubmit() {
    var category = this.category;
    category.categoryName = this.editForm.value.category;
    delete category._id;

    console.log(category);

    this.sampleService.updateCategory(category, this.id)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data = "Updated Successfully")
            this.router.navigate(['categories']);
        });
  }

}
