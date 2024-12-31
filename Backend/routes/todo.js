const { Router } = require("express");
const router = Router();
const { todoModel } = require("../db");
router.get("/", async function (req, res) {
    try {
        const todo = await todoModel.find().select("title -_id");
        console.log(todo);
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


module.exports = {
    todoRouter: router
}