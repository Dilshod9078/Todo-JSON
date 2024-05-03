import toast from "react-hot-toast"
import { CREATE, DELETE, SUCCESS, UPDATE } from "./types"

const arr = []
const reducer = (state, action) => {
    switch(action.type){
      case SUCCESS: return [...action.payload]
      case CREATE: return [...state];
      case DELETE: {
        const finded = state.filter((item) => item.id !== action.payload)
        state.splice(finded, 1)
        return [...state]
      }
      case UPDATE: {
        const updateTodo = state.find((item) => item.id == action.payload)
        return [...state]
      }
    }
}
export  {reducer, arr}