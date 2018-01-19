# Simple-CRUD-w-Express-and-Mongo
Just a simple CRUD with Express and Mongo to explain how these work.

# Technologies
* Node.js
* Express
* Mongo DB

# What is?
* Node.js: a JavaScript runtime evironment, the lovely folks that created Node made it so that we can run JavaScript as serverside-code. May God bless their souls.
* Express: a framework for building web applications using Node.js by making server creation a simpler process.
* MongoDB: non-sql database system, this is where we will store the information for the website or app.
* CRUD: This is an accronym using for Create (POST), Read(GET), Update(PUT), and Delete(DELETE). Which are a set of operations we make the servers to excecute. 

# Step 1 / Create and start your project

Create your directory through the command line:

` mkdir simple-crud`

Initialize your project:

` npm init`

# Step 2 / Server and using express

First we gotta install Express and include it in our dependencies

` npm install express --save`

Then create your server file.

` touch server.js`

Now lets put express in that file:
```
const express = require('express');
const app = express();

app.listen(3000, function() {
  console.log('listening on 3000')
})
```

We call on express and then initialize it on app. We also want to communicate with the browser so that they can communicate, we do that with the listen method that comes with Express.

Lets check what we have now so far. Go to the console and run `node server.js`, then go to your browser and navigate to localhost:3000. If you see a "Cannot GET /" message we're on the right track. This means we're communicating to the express server through the browser, but there's nothing to show since we haven't send anything to the browser.

# Step 3 / CRUD - READ(GET)
