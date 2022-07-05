import { types } from "./types"

const movieReducer = (state=[], action) => {
    switch(action.type){
        case types.MOVIES_GET_SUCCESS:
            return [...action.payload]

        case types.MOVIE_GET_SUCCESS:
            return [action.payload]

        case types.MOVIES_POST_SUCCESS:
            return [...state, action.payload]

        case types.MOVIE_DELETE_SUCCESS:
            return state.filter(ele => ele.id !== parseInt(action.payload))
            
        case types.MOVIE_PUT_SUCCESS:
            state = state.filter(ele => ele.id !== parseInt(action.payload.id))
            state.push(action.payload)
            return [...state]
        
        default:
            return state
    }
}

export default movieReducer;