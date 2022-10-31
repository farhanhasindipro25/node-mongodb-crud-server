const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dbuser1:oYr5VdK2BkX1eNmI@cluster0.h0us0hz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("nodeMongoDBCRUD").collection("users");

    // CREATE - POST
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    // READ - GET
    app.get("/users", async (req, res) => {
      const query = {}; // all (empty object)
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // UPDATE

    // DELETE - DELETE
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log("Deleting", id);
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Node MogoDB CRUD server running!");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

// user: dbuser1
// pass: oYr5VdK2BkX1eNmI
