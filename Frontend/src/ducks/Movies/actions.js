import { createAction } from 'redux-api-middleware'
import { types } from './types'

export const getMovies = () => {
    return createAction({
        endpoint: 'http://localhost:5000/api/movies',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
                types.MOVIES_GET_REQUEST, 
                {
                    type: types.MOVIES_GET_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'GET_MOVIES'}
                }, 
                types.MOVIES_GET_FAILURE
            ]
    })
};

export const getMovie = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
                types.MOVIE_GET_REQUEST, 
                {
                    type: types.MOVIE_GET_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'GET_MOVIE'}
                }, 
                types.MOVIE_GET_FAILURE
            ]
    })
};

export const addMovie = (newMovie) => {
    return createAction({
        endpoint: 'http://localhost:5000/api/movies',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        types: [types.MOVIES_POST_REQUEST, 
                {
                    type: types.MOVIES_POST_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'ADD_MOVIE'}
                }, 
                types.MOVIES_POST_FAILURE],
        body: JSON.stringify(newMovie)
    })
};

export const deleteMovie = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        types: [types.MOVIE_DELETE_REQUEST, 
                {
                    type: types.MOVIE_DELETE_SUCCESS,
                    payload: id,
                    meta: {actionType: 'DELETE_MOVIE'}
                }, 
                types.MOVIE_DELETE_FAILURE],
    }) 
}


export const editMovie = (movie) => {
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movie.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        types: [types.MOVIE_PUT_REQUEST, 
                {
                    type: types.MOVIE_PUT_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json().then(json => json)
                    },
                    meta: {actionType: 'EDIT_MOVIE'}
                }, 
                types.MOVIE_PUT_FAILURE],
        body: JSON.stringify(movie)
    }) 
}