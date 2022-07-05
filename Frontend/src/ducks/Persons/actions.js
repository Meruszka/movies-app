import { createAction } from 'redux-api-middleware'
import { types } from './types'

export const getPersons = () => {
    return createAction({
        endpoint: 'http://localhost:5000/api/persons',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
                types.PERSONS_GET_REQUEST, 
                {
                    type: types.PERSONS_GET_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'GET_PERSONS'}
                }, 
                types.PERSONS_GET_FAILURE
            ]
    })
};

export const getPerson = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/api/persons/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
                types.PERSON_GET_REQUEST, 
                {
                    type: types.PERSON_GET_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'GET_PERSON'}
                }, 
                types.PERSON_GET_FAILURE
            ]
    })
};

export const addPerson = (newPerson) => {
    return createAction({
        endpoint: 'http://localhost:5000/api/persons',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        types: [types.PERSONS_POST_REQUEST, 
                {
                    type: types.PERSONS_POST_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'ADD_PERSON'}
                }, 
                types.PERSONS_POST_FAILURE],
        body: JSON.stringify(newPerson)
    })
};

export const deletePerson = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/api/persons/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        types: [types.PERSON_DELETE_REQUEST, 
                {
                    type: types.PERSON_DELETE_SUCCESS,
                    payload: id,
                    meta: {actionType: 'DELETE_PERSON'}
                }, 
                types.PERSON_DELETE_FAILURE],
    }) 
}

export const editPerson = (person) => {
    return createAction({
        endpoint: `http://localhost:5000/api/persons/${person.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        types: [types.PERSON_PUT_REQUEST, 
                {
                    type: types.PERSON_PUT_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'EDIT_PERSON'}
                }, 
                types.PERSON_PUT_FAILURE],
        body: JSON.stringify(person)
    }) 
}