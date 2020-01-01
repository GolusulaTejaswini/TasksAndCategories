import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }
  getTasks() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/tasks').pipe();
  }
  getTaskbyID(id: number) {
    console.log(id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };

    return this._http.post('http://localhost:3000/tasks/getcurtask', options);
  }

  createTask(task) {
    return this._http.post('http://localhost:3000/tasks/newtask', task);
  }
  updateTask(task, id) {
    console.log(task);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
        task: task,
        //editeddata:task
      },
    };
    return this._http.post('http://localhost:3000/tasks/update', options);
  }
  deleteTask(task) {
    console.log(task._id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: task._id,
        task: task
      },
    };
    return this._http.delete('http://localhost:3000/tasks/delete', options);
  }

  getCategories() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/categories').pipe();
  }
  /*getUserById(id: number){
    return this._http.get(this.baseUrl + id);
  }*/

  createCategory(category) {
    return this._http.post('http://localhost:3000/categories/newcategory', category);
  }
  updateCategory(category, id) {
    console.log(category);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
        task: category,
      },
    };
    return this._http.post('http://localhost:3000/categories/update', options);
  }
  getCategorybyID(id: number) {
    console.log(id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };

    return this._http.post('http://localhost:3000/categories/getcurcategory', options);
  }

  deleteCategory(id: number) {
    console.log(id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this._http.delete('http://localhost:3000/categories/delete', options);
  }
  addTaskToCategory(category, task) {
    console.log(task);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        category: category,
        task: task,
      },
    };
    console.log(options.body.task);

    return this._http.post('http://localhost:3000/categories/addtocat', options);

  }
}