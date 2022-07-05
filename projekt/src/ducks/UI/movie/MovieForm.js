import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { addMovie, editMovie, getMovie } from "../../Movies/actions"
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieInput from "./MovieInput";



const MovieForm = ({ movie, addMovie, getMovie, match, editMovie }) => {
    useEffect(()=>{
        if(!movie && match.params.id !== undefined){
            getMovie(parseInt(match.params.id))
        }
    }, [])
    const history = useHistory()
    const handleSubmitEdit = (values) => {
        console.log(values)
        editMovie({...values, director: {id: values.director_id}})
        history.push('/movies')
    }
    const handleSubmitAdd = (values) => {
        addMovie({...values, director: {id: values.director_id}})
        history.push('/movies')
    }
    if(movie){
        return(
            <div>
                <nav>
                <Link to={`/movies`} className='link'>
                    Wróć do filmów
                </Link>
                </nav>
                <MovieInput 
                init={{
                    id: movie.id,
                    title: movie.title,
                    genre: movie.genre,
                    release_date: new Date(movie.release_date.split('T')[0]).toLocaleDateString('fr-CA'),
                    description: movie.description,
                    image_url: movie.image_url,
                    director_id: movie.director_id
                }} 
                akt={'Edytuj film'}
                h={handleSubmitEdit}/>
            </div>
    
        )
    }
    return (
        <div>
            <nav>
            <Link to={`/movies`} className='link'>
                Wróć do filmów
            </Link>
            </nav>
            <MovieInput 
            init={{
                title: '',
                genre: '',
                release_date: '',
                description: '',
                image_url: '',
                director_id: ''
            }}
            akt={'Dodaj film'}
            h={handleSubmitAdd}/>
        </div>
        )
}


const mapStateToProps = (state, props) => {
    return{
        movie: state.movies.filter(ele => ele.id === parseInt(props.match.params.id))[0],
        persons: state.persons
    }
}

const mapDispatchToProps = {
    addMovie,
    getMovie,
    editMovie
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieForm));