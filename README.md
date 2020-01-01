# TasksAndCategories
Web Application

Steps to run the application
1. Make sure you have Mongodb, npm, Nodejs and angular-cli installed.
2. Clone this repository
3. From command prompt, go to Backend directory from the cloned folder and run "npm install" and then run "npm start"
4. The above command runs the bacjend nodejs server
5. Now go to Frontend folder and then run "npm install" and followed by "ng serve --port 8081"
6. The above command runs the frontend angular application
7. Now go to browser and browse url: http://localhost:8081/

Workflow of Application:
1. When you browse through the url: http://localhost:8081/, this page loads the tasks route which shows the list tasks in the table format and 
operations need to be performed on each task as well.
2. This tasks route has a tab to go to categories route, this route is for showing the list of categories and also the operations performed on each category.
3. We can create new task and category. There are separate routes to create tasks and categories. These routes are loaded automatically when "Create New Task" or "Create New Category" buttons are clicked.
4. Each task name and its status can be edited by clicking on the edit task button on the same row of the task. Every task can be deleted by clicking on the delete button in the same row of the task.
4. There is separate route for edit operation as well.
5. We can create a task by entering the input details and we can edit only name and status of the task. For category we can only change the name of category.
6. When we did not enter category option for task, there is another operation to adding task to category. This operation is only for the tasks that are not assigned to any  category.
7. There are dropdown buttons for "Status" and task "CreatedDate" (on table header) to filter by status and sort by latest created date.
8. When we delete a task from tasks, it will be deleted from the category as well. When we create a task by entering category then it will be automatically shown on categories list in categories route.


This is the workflow I followed.
