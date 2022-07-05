import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { deletePerson, getPerson } from "../../Persons/actions";
import { getMovies } from "../../Movies/actions";
import '../../CSS/main.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const PersonDetails = ({ person, match, getPerson, deletePerson, getMovies, movies }) => {
    useEffect(()=>{
        if(!!person){
            getPerson(parseInt(match.params.id))
        }
        if(!!movies){
            getMovies()
        }
    }, [])
    const history = useHistory()
    const [er, setEr] = useState('')
    return (
        <div>
            <nav>
            <Link to={`/persons/`} className="link">
                Wroć do osób
            </Link>
            </nav>
            <div key={person.id}>
                <div className="detailsDirector">
                    <div>
                        <h1> {person.first_name} {person.last_name} </h1>
                        <h2> {new Date(person.birth_date).toLocaleDateString()} </h2>
                        <h2> {person.nationality} </h2>
                    </div>
                    <div className="buttons">
                    <button>
                    <Link to={`/persons/edit/${person.id}`} className="link">
                        Edytuj
                    </Link>
                    </button>
                    
                    <button onClick={()=>{
                        if(movies.length !== 0){
                            setEr('Najpierw usuń filmy!')
                        }
                        else{
                            deletePerson(person.id)
                            history.push('/persons')
                        }
                        }}>Usuń Osobę</button>
                    </div>
                    <div className="error">
                        {er}
                    </div>
                    <div className="directed">
                        {movies.map((ele, index) => (
                            <div className='dirMovie' key={index}>
                            <img src={ele.image_url} alt=""></img>
                            <div className="buttons">
                                <button>
                                <Link to={`/movies/${ele.id}`} className='link'>{ele.title}</Link>
                                </button>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return{
        person: state.persons.filter(ele => ele.id === parseInt(props.match.params.id))[0] || [],
        movies: state.movies.filter(ele => ele.director_id === parseInt(props.match.params.id)) || []
    }
}
const mapDispatchToProps = {
    getPerson,
    deletePerson,
    getMovies
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);