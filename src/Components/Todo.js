import React, { useState , useEffect} from 'react'
import EditTodo from './EditTodo'

import { collection, addDoc, serverTimestamp , getDocs, doc } from 'firebase/firestore'
import { db } from '../Services/firebase.config'
import { async } from '@firebase/util'

const Todo = () => {
    const collectionRef = collection(db, 'todo')
    const [createTodo, setCreateTodo] = useState('')
    const [todos , setTodo]= useState([]);

    // get to from db (firebase)
    useEffect(()=>{
        const getTodo = async ()=>{
            await getDocs(collectionRef).then((todo)=>{
                let todoData = todo.docs.map((doc)=>({...doc.data(), id:doc.id}))
                setTodo(todoData)
                console.log(todoData);
            }).catch((err)=>{
                console.log(err)
            })
        }
        getTodo()
    }, [])
    // todo handler
    const submitTodo = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collectionRef, {
                todo: createTodo,
                isChecked: false,
                timeStamp: serverTimestamp()
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-white">
                            <div className="card-body">
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#addModal"
                                    type="button"
                                    className="btn btn-info">Add Todo
                                </button>
                                {todos && Object.values(todos).map((data)=>{
                                    const timestamp = data.timeStamp;
                                    const date = timestamp.toDate();
                                    const formattedTimeStamp = date.toLocaleString();
                                    return(
                                        <div className="todo-list" key={data.id}>
                                        <div className="todo-item">
                                            <hr />
                                            <span>
                                                <div className="checker" >
                                                    <span className="" >
                                                        <input
                                                            type="checkbox"
                                                        />
                                                    </span>
                                                </div>
                                                &nbsp; {data.todo}<br />
                                                <i>{data.timeStamp ? formattedTimeStamp : 'N/A'}</i>
                                            </span>
                                            <span className=" float-end mx-3">
                                                <EditTodo /></span>
                                            <button
                                                type="button"
                                                className="btn btn-danger float-end"
                                            >Delete</button>
                                        </div>
                                      </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div
                className="modal fade"
                id="addModal"
                tabIndex="-1"
                aria-labelledby="addModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <form className="d-flex " onSubmit={submitTodo}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="addModalLabel">
                                    Add Todo
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add a Todo"
                                    onChange={(e) => setCreateTodo(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                                </button>
                                <button className="btn btn-primary">Create
                                    Todo</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Todo