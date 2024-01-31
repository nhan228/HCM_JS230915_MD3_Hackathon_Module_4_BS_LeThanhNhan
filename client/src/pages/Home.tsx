import React, { useEffect, useState } from 'react'
import api from '../apis/index.ts'
import { Store } from '@/store';
import { useDispatch, useSelector } from 'react-redux'
import { todoAction } from '../store/slices/todolist.slice.ts';
import { Modal, message } from 'antd';

import './todoList.scss'

export default function TodoList() {
    const todoStore = useSelector((store: Store) => store.todoStore)
    const dispatch = useDispatch()

    // create
    function createTask(e: React.FormEvent) {
        e.preventDefault()
        let data = {
            "name": (e.target as any).task.value
        }
        if (!data.name) {
            message.warning("Vui lòng không bỏ trống!")
            return
        }
        api.createTodo(data)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(todoAction.addTodo(res.data.data))
                    Modal.success({
                        title: "Thành công",
                        content: "Tạo task thành công!",
                    });
                    (e.target as any).task.value = ""
                }
            })
            .catch((err) => {
                console.log("err", err)
                message.error("Tạo task thất bại!")
            })
    }

    // edit
    const handleCheckboxChange = async (todoId: number, checked: boolean) => {
        const newStatus = checked ? 'completed' : 'uncompleted'
        try {
            const res = await api.editTodo(todoId, { status: newStatus })
            if (res.status == 200) {
                dispatch(todoAction.editTodo(res.data.data))
                message.success('Cập nhật task thành công!')
            }
        } catch (err) {
            console.log('err', err)
            message.error("Cập nhật task thất bại!")
        }
    }

    // delete
    const handleDeleteTodo = async (todoId: number) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa task này?',
            onOk: async () => {
                try {
                    const res = await api.deleteTodo(todoId)
                    if (res.status == 200) {
                        dispatch(todoAction.deleteTodo(todoId))
                        message.success('Xóa task thành công!')
                    } else {
                        message.error('Xóa task thất bại!')
                    }
                } catch (err) {
                    console.log('err', err)
                    message.error('Xóa task thất bại!')
                }
            },
            onCancel: () => {
                message.info('Hủy xóa task')
            },
        })
    }

    // render
    useEffect(() => {
        api.findTodo()
            .then(res => {
                if (res.status == 200) {
                    dispatch(todoAction.setTodo(res.data.data))
                }
                // err nhé
            })
            .catch(err => {
                console.log('err', err);
            })
    }, [])
    return (
        <div className='box'>
            <div className='container'>
                <div className='todo-box'>
                    {/* title */}
                    <div className='todo-title'>
                        <h2>Todo List</h2>
                        <p>Get things done, one item at a time</p>
                        <hr />
                    </div>

                    {/* tasks */}
                    <div className='todo-list'>
                        {
                            todoStore.todolist?.map(task => (
                                <div className='todo-item' key={Date.now() * Math.random()}>
                                    <div className='task-name' style={{ textDecoration: task.status == 'completed' ? 'line-through' : 'none' , color: task.status == 'completed' ? '#f3979a' : '#fff' }}>{task.name}</div>
                                    <div className='action'>
                                        <input
                                            type='checkbox'
                                            checked={task.status == 'completed'}
                                            onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                        />
                                        <i className="fa-solid fa-trash" onClick={() => handleDeleteTodo(task.id)} />
                                    </div>
                                </div>
                            ))
                        }
                        <div className='move-group'>
                        <span>Move done items at the end?</span>
                        <label className="switch">
                                <input className="toggle-state" type="checkbox" name="check" value="check" />
                                <span className="slider"></span>
                        </label>
                        </div>
                        
                    </div>

                    {/* add */}
                    <div className='todo-add'>
                        <p>Add to the todo list</p>
                        <form className='add-form' onSubmit={(e) => {
                            createTask(e)
                        }}>
                            <input
                                type="text" placeholder='Add a new task'
                                name='task'
                                autoFocus
                            />
                            <button type='submit'>ADD ITEM</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
