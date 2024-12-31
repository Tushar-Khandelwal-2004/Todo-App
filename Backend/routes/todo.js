const { Router } = require("express");
const router = Router();
const { todoModel } = require("../db");
router.get("/", async function (req, res) {
    try {
        const todos = await todoModel.find().select("title _id"); 
        const formattedTodos = todos.map(todo => ({
            id: todo._id,  
            title: todo.title 
        }));
        res.json({
            todos: formattedTodos  
        });
    } catch {
        res.status(403).send({
            message: "Todo get failed!"
        });
    }
});
router.post("/addTodo", async function (req, res) {
    const { title } = req.body;
    await todoModel.create({
        title: title
    });
    res.json({
        message: "Todo Created!"
    })
});

router.delete("/deleteTodo", async function (req, res) {
    const id = req.headers.id;  // Get the ID from headers
    console.log("Deleting Todo with ID:", id);
    try {
        const result = await todoModel.findByIdAndDelete(id);
        console.log(result);
        console.log(!result);
        if (!result) {
            return res.status(404).json({
                message: "Todo not found!",
            });
        }

        res.json({
            message: "Todo Deleted!",
        });

    } catch (e) {
        res.json({
            message: "Error Deleting Todo"
        })
    }

    // const id = req.params.id;
    // console.log("Deleting Todo with ID:", id);
    // console.log(id);
    // try {
    //     const result = await todoModel.findByIdAndDelete(id);
    //     if (!result) {
    //         return res.json({
    //             message: "Todo not found!"
    //         })
    //     }
    //     else {
    //         return res.json({
    //             message: "Todo Deleted!"
    //         })
    //     }
    // }
    // catch(e){
    //     return res.json({
    //         message:"Error Deleting Todo"
    //     })
    // }

})

module.exports = {
    todoRouter: router
}