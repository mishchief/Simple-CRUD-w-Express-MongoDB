# Simple-CRUD-w-Express-and-Mongo

Just a simple CRUD with Express and Mongo to explain how these work for beginners.

# Technologies

- Node.js
- Express
- MongoDB @ 2.2.33
- es6
- Nodemon
- body-parser
- Embedded JavaScript (ejs)

  # What is?

- Node.js: a JavaScript runtime environment, the lovely folks that created Node made it so that we can run JavaScript as server side-code. May God bless their souls.
- Express: a framework for building web applications using Node.js by making server creation a simpler process.
- MongoDB: nosql database system, this is where we will store the information for the website or app.
- CRUD: This is an acronym using for Create (POST), Read(GET), Update(PUT), and Delete(DELETE). Which are a set of operations we make the servers to execute.
- Nodemon: is a utility that will monitor for any changes in your source code and automatically restart your server. Perfect for development.
- Middleware: is computer software that provides services to software applications beyond those available from the operating system. It can be described as "software glue".

  # Step 1 / Create and start your project

   Create your directory through the command line: `mkdir simple-crud` Initialize your project: `npm init`

  # Step 2 / Server and using express

   First we gotta install Express and include it in our dependencies `npm install express --save` Then create your server file. `touch server.js` Now let's put express in that file:

  ```
  const express = require('express');
  const app = express();
  app.listen(3000, function() {
  console.log('listening on 3000')
  })
  ```

  We call on express and then initialize it on app. We also want to communicate with the browser so that they can communicate, we do that with the listen method that comes with Express. Let's check what we have now so far. Go to the console and run `node server.js`, then go to your browser and navigate to localhost:3000\. If you see a "Cannot GET /" message we're on the right track. This means we're communicating to the express server through the browser, but there's nothing to show since we haven't send anything to the browser.

  # Step 3 / CRUD - READ(GET)

   Whenever we visit a website the browser sends a **GET** request to the server to perform a READ operation. This is why we are seeing the "cannot get/" error, it's trying to **GET** but we're not GIVING (not a real term) yet - because have nothing to send back at the moment. To handle **GET** requests we use the `get` method:

  ```
  app.get(path, callback)
  ```

  `path` is anything that comes after your domain name, it's the path that **GET** is going to look at. In this case we're looking at localhost:3000, but the browser is actually looking for localhost:3000/, in this case the `path` is `/`. The callback function tells the server what to do when we find the path. It takes a request and a response object.

  ```
  app.get('/', function (request, response) {
  // do something here
  })
  ```

  So what do we do inside the **GET**? we can just right "Hello World" for now to show it in the browser. To do this we need to use the `send` method. This method comes with a response and a request object. These are usually written as `res` and `req` respectively.

  ```
  app.get('/', (req, res) => {
  res.send('Hello World')
  })
  ```

  You should restart your server and see it display our message. After this we want to change the app to serve an `index.html` page to the browser. Let's do this by using the `sendFile` method that's provided by the `res` object. For people that stumble upon this and don't know what `__dirname` is, it is the directory the directory where you are in.

  ```
  app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  })
  ```

  With `sendfile` we tell Express to serve the `index.html` file that we will make on the root of our project. Let's create the file through the console: `touch index.html` And let's put some html in the file as well:

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Simple CRUD</title>
  </head>
  <body>
  Node and Express are the best!
  </body>
  </html>
  ```

  Now when we restart the server and navigate to `localhost:3000` we will see the html file. And this is how Express handles **GET** (READ) in short. Up next, to speed up the process we will install something to avoid having to manually restart the server every time we make a change.

  # Step 4 / Nodemon

   Basically, Nodemon restarts the server automatically whenever you save a file that the server uses. `npm install nodemon --save-dev` We're using `--save-dev` in this instance because this is a dependency exclusive for the development environment, so we save it as a devDependency. If you want to run nodemon through the command line you need to install it globally by adding the `-g` flag to the installation like so: `npm install nodemon -g` But if you don't install it globally, you can run it as a script if you add the following line to your `package.json` file:

  ```
  "scripts": {
    "dev": "nodemon server.js"
  }
  ```

  And then start the server by running either: `nodemon server.js` If you install nodemon globally, or: `npm run dev` If you're running it with npm through a script in `package.json`.

  # Step 5 / CRUD - CREATE(POST)

  **CREATE** is an operation performed only by the browser if a **POST** request is sent to the server. The **POST** request can be triggered with JavaScript or through a `<form>` tag. Lets create a `<form>` tag element and add it to your `index.html` file. There are 3 things necessary for this element:
- We need an `action` attribute
- We need a `method` attribute
- We need `name` attributes on all `<input>` elements within the form So we need something like this added to our `index.html`:

  ```
  <form action="/messages" method="POST">
  <input type="text" placeholder="name" name="name">
  <input type="text" placeholder="message" name="message">
  <button type="submit">Submit</button>
  </form>
  ```

  The `action` attribute communicates with the browser and tells him where to look in our Express app. We want to navigate to `/messages`. The`method` attribute tells the browser what to request to send, a **POST** request. On the server, we can handle this POST request with a `post` method. Provided - like **GET** - by Express and works similarly. We can add the following code to our `server.js` file:

  ```
  app.post('/messages', (req, res) => {
  console.log('What up BOI?!')
  })
  ```

  Save, nodemon will restart the server, refresh the browser, and then write something on the form and you should be able to see you message - in this case What up Boi?! - in the command line. Now we know that Express is handling the form correctly. Now something that we need to understand is that Express does not handle reading data from the `<form>` element by itself. We need to add another package called `body-parser` to do this. We add middlewares like `body-parser` to Express with the `use` method. Middlewares are plugins that change the request or response object before they get handled by our application. We need to place these before the CRUD handlers to make use of them. As with every import we declare it at the top and then use it right after the `express()` declaration, in our case:

  ```
  const express = require('express')
  const bodyParser= require('body-parser')
  const app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  // Handlers here...
  ```

  `urlencoded` method communicates to body-parser to extract data from elements- in this case `<form>` and to add them to the `body` property in the `request` object. By doing this the middleware creates a .json format of the `<form>` so that we can process it. Now we need to make the following changes to our code to use our body-parser. We will also add a console log again so that we can see what's being returned.

  ```
  app.post('/messages', (req, res) => {
  console.log(req.body)
  })
  ```

  You should see something like this on the command line: Note: remember your input HTML code, the first field is name and the second is comment.

  ```
  { name: 'name you inputted on your form',
  message: 'your message' }
  ```

  Alright now that we're parsing our form to something readable let's begin the database work.

  # Step 6 / MongoDB

   The first thing we need to do to start using MongoDB is to install it with npm to use it as our database. `npm install mongodb@2.2.33 --save` It's important to install that version to work with the current setup that we have. After this we can connect to MongoDB with the `connect` method that comes with `Mongo.Client`. We need to setup the following code in our `server.js` file: **Note:** this code goes before the handlers, we will also have to move our start server code, the `listen`, into inside the MongoDB connect method. But more on this later.

  ```
  const MongoClient = require('mongodb').MongoClient
  MongoClient.connect('mongodb-url', (err, database) => {
  // ... server code (app.listen)
  })
  // ... Handlers
  ```

  Next go to mlab.com and create an account, it's free. Once you've signed up, click on create new, let's use aws (Amazon Web Services) and choose sandbox. Choose the name for your database, and then create it. After this go into your database and create a user on the users tab, this is needed to access the database. Next, we want to grab the MongoDB url and add it to the `MongoClient.connect` method. Then change the database user and password for the user and password you setted up on the users tab. **NOTE:** Do not include the `<>` tags on the user and password. After this we want to start our servers only when the database is connected. This is why I mentioned above that we need to move our `app.listen` into the `connect` method. We also need to create a `db` variable to allow us to use the database when we talk with the browser.

  ```
  var db
  MongoClient.connect('your-mongodb-url', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
   console.log('listening on 3000')
  })
  })
  ```

  Now that our MongoDB is setted up let's dive in and create a `messages` collection to store our application messages. Go to the collections tab and click on `Add collection`. A collection is just where we will store data. You can create as many collections as you want. After you create your `messages` collection we call it by using MongoDB's `db.collection()` method. We can start saving our first entry into MongoDB with the `save` method. Once we save we will be redirected back to `/` which will cause their browser to reload. This is the `app.post` code we will use to save to our database.

  ```
  app.post('/messages', (req, res) => {
  db.collection('messages').save(req.body, (err, result) => {
   if (err) return console.log(err)
   console.log('saved to database')
   res.redirect('/')
  })
  })
  ```

  Now if you enter something into our form and submit it, you will see an entry in your MongoDB collection. Now let's get cracking on how to display the messages to whoever visits the page.

  # Step 7 / Displaying Messages

   Now to display the messages we need to do two things: Get the messages from MongoLab, and use a template engine to display the messages. First lets go ahead and get the messages by using the `find` method that's available in the `collection` method in junction with the `toArray` method that takes a callback function and allows us to actually use the information in the collection. Without `toArray` we would see a MongoDB object. Paste the following code under your `app.get` function after the res.sendFile() method:

  ```
  db.collection('messages').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with messages here
  })
  ```

  If you reload your browser you will now see in your command line any messages you've sent to the collection. Now the next thing we want to do is to display it on the HTML. Since there's no way to add dynamic content to an HTML file we have to use a template engine. Let's use Embedded JavaScript (ejs) since it's beginner friendly. Let's install ejs: `npm install ejs --save` After installing we initialize it in our `server.js` file after our MongoDB connect method:

  ```
  \\ ... MongoDB connect method
  app.set('view engine', 'ejs')
  \\ ... Handlers and other methods
  ```

  Now we can begin talking to HTML to display our messages. We call this process **rendering**. We call on the `render` object that is found on the `response` object to do so. It follows the following format: `res.render(view, locals)` The first parameter, `views`, is the name of the file we're rendering, the file must be placed within a folder called views. The second parameter, `locals`, is an object that passes data into the view. Lets first create an `index.ejs` file within the `views` folder to get this started.

  ```
  mkdir views
  touch views/index.ejs
  ```

  Now we will put the following code in the index.ejs:

  ```
  <ul class="messages">
  <% for(var i=0; i<messages.length; i++) {%>
   <li class="message">
     <span><%= messages[i].name %></span>
     <span><%= messages[i].message %></span>
   </li>
  <% } %>
  </ul>
  ```

  Let's see what we have here. First, in EJS you can write JavaScript within the `<%` and `>%` tags. You can also output JavaScript as strings if you use the `<%=` and `%>` tags. Second, as you can see we;re just looping through the messages array and creating strings with `messages[i].name` and `messages[i].message`. We also need to copy the rest of the `index.html` file into this file. Remember that the messages will render depending where you put the ejs of the code, so if you want them to show after the form put the ejs code right before the form, and vice versa. Now we have to render the ejs file when calling the **GET** request. In the following code we're setting the results - which are an array - as the `messages` array we used in `index.js`. Replace the `app.get` with this:

  ```
  app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
   if (err) return console.log(err)
   // renders index.ejs
   res.render('index.ejs', {messages: result})
  })
  })
  ```

  Now we should see the messages showing up on out app! That's great! We're creating here! You will see as you submit more messages they will begin appearing one by one as you submit them! Great-great!

  # Step 8 / CRUD - Update (PUT)
