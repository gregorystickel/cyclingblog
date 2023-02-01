import { createStore } from '@reduxjs/toolkit'

let initialState = {
    posts: [],
    modalOpen: false,
  }


  const reducer = (state = initialState, action ) => {
    switch(action.type) {
       case 'ADDPOST':      
       console.log("Action", action)
       return {...state, posts: [ ...state.posts, action.payload]}
       case 'SETMODALOPEN':
       console.log("Action", action)
       return {...state,  modalOpen: action.payload }
       default:
         return state
       }
       
   }  


   const store = createStore(reducer);

   export default store;