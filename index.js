// // REST - REPRESENTATIONAL STATE TRANSFER
// // REST is an architectural style for designing networked applications. 
// // It relies on a stateless, client-server, cacheable communication protocol — the HTTP protocol.
// // REST organizes data into unique URIs that differentiate resources on the server.
// // It uses standard HTTP methods to perform CRUD operations:
// // - CREATE: POST
// // - READ: GET
// // - UPDATE: PUT/PATCH
// // - DELETE: DELETE
// // Status codes provide information about the result of the operation:
// // - 2XX: Success
// // - 4XX: Client errors (e.g., bad request, unauthorized)
// // - 5XX: Server errors (e.g., server failed to fulfill request)
// // REST is stateless, meaning each request from a client to the server must contain all the information needed to understand and process the request.
// // In this code, Express.js is used to create a simple REST API.

// // npm init -y: Initializes a new Node.js project, creating a package.json file with default settings.(-Y MEANS YES)
// // npm install express: Installs the Express.js framework.
// // Create index.js: This file contains the server code.

// // Importing the Express library and assigning it to the constant `express`.
// const express = require('express');

// // Creating an instance of the Express application using the `express()` function.
// // This `app` object is used to define routes, handle requests, and apply middleware.
// const app = express();

// // Defining the port number where the server will listen for incoming requests.
// const PORT = 8081;

// // Middleware to parse incoming JSON requests and make the data available on `req.body`.
// // This allows the API to handle JSON payloads in POST, PUT, or PATCH requests.
// app.use(express.json());

// // Starting the server and listening on the specified port.
// // The callback function logs a message when the server is up and running.
// app.listen(
//     PORT,
//     () => console.log(`Server is running on http://localhost:${PORT}`)
// );

// // Defining a GET route at the `/tshirt` endpoint.
// // When a GET request is made to this endpoint, it returns a JSON object with a `tshirt` and `size`.
// app.get('/tshirt', (req, res) => {
//     res.status(200).send({
//         tshirt: 'tt',
//         size: 'large'
//     });
// });

// // Defining a POST route at the `/tshirt/:id` endpoint.
// // This route allows the creation of new data on the server.
// // Route parameters and request body data are used to customize the response.
// app.post('/tshirt/:id', (req, res) => {
//     // Destructuring the `id` from the route parameters and `logo` from the request body.
//     const { id } = req.params;
//     const { logo } = req.body;

//     // Checking if the `logo` is provided in the request body.
//     // If not, responding with a 418 status code and an error message.
//     if (!logo) {
//         res.status(418).send({ message: 'We need a logo' });
//         return; // Ensure the function exits after sending the response.
//     }

//     // Sending a JSON response that includes the provided `logo` and `id`.
//     res.send({
//         tshirt: `T-shirt with your ${logo} and ID of ${id}`,
//     });
// });






const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose schema and model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    email:{
        type:String,
        required:[true],
        default:"jhon@gmail.com"
    }
},
{
    timestamps:{createdAt:'createdDate' }
}
);

const Post = mongoose.model('Post', postSchema);

// POST endpoint to create a new post
app.post('/post', async (req, res) => {
    const newPost = new Post(req.body);

    try {
        await newPost.save();
        res.status(201).send({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET endpoint to retrieve all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//use "node ." to start server
//currently using postman sa client