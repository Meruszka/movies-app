import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { deleteMovie, getMovie } from "../../Movies/actions";
import { getPersons } from "../../Persons/actions";
import '../../CSS/main.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const MovieDetails = ({ movie, match, getMovie, deleteMovie, getPersons, persons }) => {
    useEffect(()=>{
        if(!!movie){
            getMovie(match.params.id)
        }
        if(!!persons){
            getPersons()
        }
    }, [])
    const history = useHistory()
    const director = persons.filter(ele => ele.id === movie.director_id)[0] || []
    return (
        <div>
            <nav>
            <Link to={`/movies/`} className='link'>
                Wroć do filmów
            </Link>
            </nav>
            <div key={movie.id}>
                <div className='details'>
                    <div>
                        <h1> {movie.title} </h1>
                        <img src={movie.image_url} alt=""></img>
                        <Link to={`/persons/${director.id}/`} className='link'>{director.first_name} {director.last_name}</Link>
                        <span> {new Date(movie.release_date).toLocaleDateString()} </span>
                        <span> {movie.genre} </span>
                        <span className="desc"> {movie.description} </span>
                    </div>
                    <div className='buttons'>
                        <button>
                            <Link to={`/movies/edit/${movie.id}`} className='link'>
                                Edytuj
                            </Link>
                        </button>
                        <button onClick={()=>{
                            deleteMovie(movie.id)
                            history.push('/movies')}}>Usuń film</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return{
        movie: state.movies.filter(ele => ele.id === parseInt(props.match.params.id))[0] || [],
        persons: state.persons || []
    }
}
const mapDispatchToProps = {
    getMovie,
    deleteMovie,
    getPersons
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);