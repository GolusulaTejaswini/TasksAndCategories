Steps followed while implementing the web application for tasks and categories

1. First I installed Mongodb on my mac and then installed npm, nodejs, angular-cli, express
2. Created express Nodejs app for handling API.
3. Created angular application 
4. First I wrote Api's for providing services to user interface in nodejs.
5. I created Newtask, EditTask, RetrieveTasks, DeleteTasks routes for task implementation.
6. And then I created NewCategory, RetrieveCategory, EditCategory, DeleteCategory for categories implementation.
7. Also created a route called AddToCat fro adding the tasks to categories.
8. Now wrote business logic for each route to serve the requests.
9. And then created components (Tasks List, New Task, Edit Task, Categories List, New category, Edit category) that are required for the application. Also created one service to interact with the nodejs application.
10. For each component I wrote payload formats and then wrote logic to send request to server.
11. For delete operation I did not create any component because it is easy to unshow the deleted task/category in the same component.
12. Added little styles like table format and colors to make it look good.
13. Everything the is loaded is taken from mongoDb and edited in between.
