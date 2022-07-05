import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import '../CSS/main.css'
import { getMovies } from "../Movies/actions";
import { getPersons } from "../Persons/actions";
import { withRouter } from "react-router";
import store from '../store'


const Main = ({ getMovies, getPersons}) => {
    useEffect(() => {
        getMovies()
        getPersons()
    }, [])
    console.log(store.getState())
    return (
        <main>
            <div>
                {}
            </div>
            <nav>
                <Link to={`/movies`} className="link">
                    Filmy
                </Link>
                <Link to={`/persons`} className="link">
                    Reżysterowie
                </Link>
            </nav>
        </main>
    )
}

const mapStateToProps = (state) => {
    return{
        movies: state.movies,
        persons: state.persons,
    }
}

const mapDispatchToProps = {
    getPersons,
    getMovies
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));