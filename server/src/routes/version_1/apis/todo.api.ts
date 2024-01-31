import { todoController } from "../../../controllers/todo.controller"

import express from "express"
const Router = express.Router()

Router.post("/", todoController.create)
Router.get("/", todoController.findAll)
Router.get("/:id", todoController.findById)
Router.put("/:id", todoController.edit)
Router.delete("/:id", todoController.delete)

export default Router