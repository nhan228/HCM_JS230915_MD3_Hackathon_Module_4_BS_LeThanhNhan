import axios from "axios";
const prefix = "todo";

export default {
    createTodo: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}`, data)
    },
    findTodo: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}`)
    },
    findTodoById: async (todoId: number) => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${todoId}`)
    },
    editTodo: async (todoId: number, data: any) => {
        return await axios.put(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${todoId}`, data)
    },
    deleteTodo: async (todoId: number) => {
        return await axios.delete(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${todoId}`)
    }
}