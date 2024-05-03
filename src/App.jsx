
import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { arr, reducer } from './reducer'
import toast, { Toaster } from 'react-hot-toast'
import { CREATE, DELETE, SUCCESS, UPDATE } from './reducer/types'
import instance from './api/instance'
import Modal from './components/Modal/Modal'


function App() {

const [refresh, setRefresh] = useState(false)
const [todo, dispatch] = useReducer(reducer, arr)
const [modal, setModal] = useState(false)


const [updateId, setUpdateId] = useState(null)
const [values, setValues] = useState("")

  const handleTodo = (evt) => {
    evt.preventDefault()
    const data = {
      id:(todo.length ? (parseInt(todo[todo.length - 1].id) + 1).toString() : "1"),
      value:evt.target.todo.value
    }
    evt.target.reset()
    try{
      instance().post('/todo', data).then((res) => {
        dispatch({type: CREATE})
        setRefresh(!refresh)
      })
    }
    catch(err)  {
      console.log(err)
    }

  }


const handleDeleteClick = (e) =>{
  try{
    instance().delete(`/todo/${e.target.id}`).then((res) =>{
      dispatch({type:DELETE, payload:e.target.id})
      setRefresh(!refresh)
      toast.success("Task deleted!")     
    })
  }
  catch(err){
    console.log(err);
  }
}

const updateClick = (id, value) => {
   setModal(true)
   setUpdateId(id)
   setValues(value)
}

const handleUpdateForm = (evt) => {
  evt.preventDefault()
  const data = {
    value: values
  }
  try {
    instance().put(`/todo/${updateId}`, data)
      .then((res) => {
        dispatch({ type: UPDATE, payload: updateId });
        setRefresh(!refresh);
        setModal(false)
        toast.success("Ma'lumotlar yangilandi");
      });
  } 
  catch (err) {
  console.log(err);
  }
}


useEffect(() =>{
  instance().get("/todo").then(res =>{
    dispatch({type:SUCCESS, payload:res.data})
  })
}, [refresh])

  return (
    <>
    <form onSubmit={handleTodo} className='w-[700px] bg-white rounded-md p-4 mx-auto mt-10'>
    <Toaster  position="top-center"  reverseOrder={false}/>
      <h2 className='text-center text-[30px] font-semibold mb-[20px]'>Simple Todo</h2>
      <label className='flex items-center justify-between'>
          <span className='text-[20px]'>Enter Todo:</span>
          <input name='todo' autoComplete='off' className='p-3 w-[60%] rounded-md outline-none focus:shadow-md focus:shadow-slate-600' required type="text" placeholder='Enter Todo' />
          <button type='submit' className='p-2 text-[22px] bg-blue-500 text-white rounded-md font-bold w-[20%]'>+Add</button>
      </label>
    </form>

    <ul className='w-[700px] felx flex-col space-y-2 mx-auto mt-5'>
      {todo.map((item) => (
        <li key={item.id} className='bg-white p-2 flex items-center justify-between rounded-md'>
          <span className='text-[20px] font-medium'>{item.value}</span>
          <div className='flex items-center space-x-4'>
            <button onClick={() => updateClick(item.id, item.value)}  className='p-1.5 font-bold text-[20px] bg-blue-500 text-white rounded-md'>Update</button>
            <button onClick={handleDeleteClick}  id={item.id} className='p-1.5 font-bold text-[20px] bg-red-500 text-white rounded-md'>Delete</button>
          </div>
        </li>
      )
      )}
    </ul>

    <Modal modal={modal} setModal={setModal}>
          <form onSubmit={handleUpdateForm} className="p-5 rounded-lg mx-auto flex flex-col justify-center items-center" >
            <div className="flex items-end justify-between w-full">
              <label className="w-full flex flex-col gap-[10px] items-start">
                <span className="font-semibold text-[20px]"> Enter your update todo</span>
                <input onChange={evt => setValues(evt.target.value)} value={values} className="w-[90%] p-2 rounded-md" name="todoName" placeholder="Enter your update todo" type="text" autoComplete="off"/>
              </label>
              <button className="p-2 mt-5 transition hover:scale-110 rounded-md w-[25%] bg-blue-500 text-white text-center text-[20px]">Save</button>
            </div>
          </form>
        </Modal>
    </>
  )
}

export default App
