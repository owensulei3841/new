##1. Using angular cli to create new project naming it studentManagement

2. copy all the files from github and replace all of them in the studentManagement folder

3. install bootstrap into the project using nom install —-save bootstrap and add the bootstrap into file which is .angular-cli.json

   replace following code into the file which is .angular-cli.json
	  "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ]

4. Please make sure you have a mysql in computer.

5. Please make sure the the host, user, password and database match the information in backend/index.js from line 9 to 14

6. Making sure the mysql is running.

7. Navigate to backend folder using cli and type following to install dependencies: 
   npm install

7. To start up the server, Using terminal and navigate to backend folder. 
   Run: nodemon index

8. Create a new cli window, then we need to start up the front end server. Using the new terminal to navigate to studentManagement folder, then run ng serve
