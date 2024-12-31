const { Router } = require("express");
const router = Router();
const { todoModel } = require("../db");
router.get("/", async function (req, res) {
    try {
        const todo = await todoModel.find().select("title -_id");
        // console.log(todo);
        const todos=todo.map(todo=>todo.title);
        res.json({
            todos
        })
    }
    catch{ 
        res.status(403).send({
            message:"Todo get failed!"
        })
    }
});
router.post("/addTodo",async function(req,res) {
    const {title}=req.body;
    await todoModel.create({
        title:title
    });
    res.json({
        message:"Todo Created!"
    })
});


module.exports = {
    todoRouter: router
}