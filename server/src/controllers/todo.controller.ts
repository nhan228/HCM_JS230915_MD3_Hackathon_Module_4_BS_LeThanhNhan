import { Request, Response } from 'express'
import { todoModel } from '../models/todo.model'

export const todoController = {
    create: async (req: Request, res: Response) => {
        try {
            const { status, data, message } = await todoModel.create(req.body)
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server bảo trì!'
            })
        }
    },
    findAll: async (req: Request, res: Response) => {
        try {
            let { data, message, status } = await todoModel.findAll();
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server bảo trì!',
            })
        }
    },
    findById: async (req: Request, res: Response) => {
        try {
            let todoId = parseInt(req.params.id);
            let { data, message, status } = await todoModel.findById(todoId);
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message: message
                }
            }
        } catch (err) {
            console.log('err', err)
            return res.status(500).json({
                message: (err as Error).message || 'Server bảo trì!'
            })
        }
    },
    edit: async (req: Request, res: Response) => {
        try {
            const taskId = parseInt(req.params.id)
            const { data, message, status } = await todoModel.edit(taskId, req.body)
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server bảo trì!'
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const taskId = parseInt(req.params.id)
            const { data, message, status } = await todoModel.delete(taskId)
            if (status) {
                return res.status(200).json({
                    message,
                    data
                });
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server bảo trì!'
            })
        }
    }
}
