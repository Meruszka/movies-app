import { types } from "./types"

const personReducer = (state=[], action) => {
    switch(action.type){
        case types.PERSONS_GET_SUCCESS:
            return [...action.payload]

        case types.PERSON_GET_SUCCESS:
            return [action.payload]

        case types.PERSONS_POST_SUCCESS:
            return [...state, action.payload]

        case types.PERSON_DELETE_SUCCESS:
            return state.filter(ele => ele.id !== parseInt(action.payload))
        
        case types.PERSON_PUT_SUCCESS:
            state = state.filter(ele => ele.id !== parseInt(action.payload.id))
            state.push(action.payload)
            return [...state]

        default:
            return state
    }
}

export default personReducer;