import { createSlice } from "@reduxjs/toolkit"

enum Status {
    "completed" = "completed",
    "uncompleted" = "uncompleted"
}
export type Todolist = {
    id: number;
    name: string;
    status: Status
}
interface InitState {
    todolist: Todolist[] | null;
}
let initialState: InitState = {
    todolist: [],
}

const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todolist = action.payload
        },
        addTodo: (state, action) => {
            state.todolist.push(action.payload)
        },
        editTodo: (state, action) => {
            state.todolist = state.todolist.map((task) => {
                if (task.id == action.payload.id) {
                    return action.payload
                }
                return task
            })
        },
        deleteTodo: (state, action) => {
            state.todolist = state.todolist.filter((item) => item.id != action.payload)
        }
    }
})

export const todoReducer = todolistSlice.reducer;
export const todoAction = todolistSlice.actions;