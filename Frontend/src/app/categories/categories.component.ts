import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categories;
  constructor(private sampleService: ServiceService, private router: Router) { }

  ngOnInit() {
    this.sampleService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }
  deleteCategory(category): void {
    console.log(category);
    this.sampleService.deleteCategory(category._id)
      .subscribe(data => {
        console.log(data);
      });
    window.location.reload();
  };

  editCategory(category): void {
    this.router.navigate(['editcategory', category._id]);
  };

  addCategory(): void {
    this.router.navigate(['newcategory']);
  };

}
