const express = require("express");
const connectDB = require("./db/mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/users")
const productRoutes = require("./routers/products")



const app = express();
connectDB();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// const corsOptions = {
//   origin: "https://app-next-client.herokuapp.com",
//   credentials: true,
// }

app.use(cors());
app.use(userRoutes)
app.use(productRoutes)

app.get('/', (req,res)=> {
    try {
        res.send('Success')
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
