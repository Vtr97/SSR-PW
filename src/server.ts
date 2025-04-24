import express from "express";
import {engine} from "express-handlebars"
import path from "path";
const app = express();

app.engine("handlebars", engine({
    helpers: {
        equals: (a: string, b: string) => a === b
    }
}));
app.set("view engine","handlebars");
app.set("views",path.resolve(__dirname,"..","views"));
app.use("/static",express.static(path.resolve(__dirname,"..","static")))
app.get("/simples",(req,res) => {
    res.render("simples",{
        layout:false,
        value1:"Example value 1",
        value2:"Example value 2"
    })
})

app.get("/list",(req,res) => {
    res.render("list",{
        items: ["item 1", "item 2", "item 3", "item 4"]
    })
})
app.get("/products",(req,res) => {
    res.render("products",{
        products:[
            {
                name:"product 1",
                price: 20.00,
                description: "Description for product 1"
            }
            ,
            {
                name:"product 2",
                price: 51.30,
                description: "Description for product 2"
            }
            ,
            {
                name:"product 3",
                price: 59.99,
                description: "Description for product 3"
            }
        ]
    })
})
app.get("/",(req,res) => {
    res.render('home')
})

app.get("/profile", (req,res) => {
    res.render("profiles",{
        isLoggedIn:true,
        username:"janedoe",
        isAdmin:true
    })
})

app.get("/error", (req,res) => {
    res.render("errors", {
        code: "erro estranho"
    })
})

app.get("/unless-example", (req,res) => {
    res.render("unless-example",{
        isLoggedIn:false,
        username:"janedoe",
        isAdmin:true
    })
})
const port = 3000
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})