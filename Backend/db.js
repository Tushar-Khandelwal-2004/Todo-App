const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const todoSchema=new Schema({
    title:{type:String,required:true}
})
const todoModel=mongoose.model("todo",todoSchema);
module.exports={ 
    todoModel
}