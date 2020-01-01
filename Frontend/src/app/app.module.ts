import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewtaskComponent } from './newtask/newtask.component';
import { TasksComponent } from './tasks/tasks.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewcategoryComponent } from './newcategory/newcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'newtask', component: NewtaskComponent },
  { path: 'edittask/:id', component: EdittaskComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'newcategory', component: NewcategoryComponent },
  { path: 'editcategory/:id', component: EditcategoryComponent }

];

@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    NewtaskComponent,
    EdittaskComponent,
    TasksComponent,
    CategoriesComponent,
    TasksComponent,
    NewcategoryComponent,
    EditcategoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
