Installation guidelines

...........................................

#1 Be in the root directory................

#2 Get inside of backend folder............

cd backend

#3 Make a .env file and insert the details

touch .env
vi .env

PORT=backend_port_here
DB_HOST=database_host_here
DB_USER=database_user_here
DB_PASS=database_password_here
DB_NAME=database_name_here

#3 After Run this commands.................

npm install
npm start

#4 Your backend is now running.............

#5 Simply go to the frontend folder........

cd ..
cd frontend
cd src
vi contant.js

//By default it's 4100. Change it to other port such as 28881...

export const BACKEND_URL = "http://localhost:4100";

//Then save and go back to frontend root folder

cd ..

#7 Now run this commands...................

npm install
npm audit fix
npm start

#7 Your application is running.............
