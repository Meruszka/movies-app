import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../../Movies/actions";
import MovieSort from "./MovieSort";
import '../../CSS/main.css'


const MovieList = ({ movies, deleteMovie, getMovies }) => {
    useEffect(()=> {
        getMovies()
    }, [])
    const [sorto, setSorto] = useState('')
    const swSort = (s) => {
        switch(s){
            case 'alf': 
                return [...movies.sort((a, b) => {
                        return a.title.toLowerCase() !== b.title.toLowerCase() ? a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1 : 0
                    })]
            case 'alfr': 
                return [...movies.sort((a, b) => {
                    return a.title.toLowerCase() !== b.title.toLowerCase() ? a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1 : 0
                })]
            case 'year': 
                return [...movies.sort((a, b) => {
                    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
                })]
            case 'yearr': 
                return [...movies.sort((a, b) => {
                    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                })]
            default: 
                return movies
        }
    }
    return (
        <div className="menu"> 
            <nav>   
                <Link to={`/`} className="link">
                    Główna
                </Link>
                <Link to={`/movies/add`} className='link'>
                    Dodaj film
                </Link>
                <div>
                <span>Sorotowanie</span>
                <MovieSort h={setSorto}/>
                </div>
            </nav>  
            <div>
                <ul className='list'>
                    {swSort(sorto).map(movie => (
                        <li key={movie.id} className="li">
                            <div>                                    
                                <Link to={`/movies/${movie.id}`} className='link'>
                                    <div className='title'> {movie.title} </div>
                                    <div className="img">
                                    <img src={movie.image_url} alt=""></img>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        movies: state.movies || []
    }
}

const mapDispatchToProps = {
    getMovies,
    deleteMovie
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieList));