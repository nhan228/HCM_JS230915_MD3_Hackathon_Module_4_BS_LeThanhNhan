import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todolist.slice";
const RootReducer = combineReducers({
    todoStore: todoReducer
})

export type Store = ReturnType<typeof RootReducer>;

export const store = configureStore({
    reducer: RootReducer
})