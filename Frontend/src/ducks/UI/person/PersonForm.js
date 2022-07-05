import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { addPerson, getPerson, editPerson } from "../../Persons/actions"
import { useEffect } from "react";
import PersonInput from "./PersonInput";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../../CSS/main.css';


const PersonForm = ({ person, addPerson, getPerson, match, editPerson }) => {
    useEffect(()=>{
        if(!person && match.params.id !== undefined){
            getPerson(parseInt(match.params.id))
        }
    }, [])
    const history = useHistory()
    const handleSubmitEdit = (values) => {
        editPerson({...values, id: match.params.id})
        history.push(`/persons/${match.params.id}`)
    }
    const handleSubmitAdd = (values) => {
        addPerson(values)
        history.push(`/persons`)
    }
    
    if(person){
        return(
            <div>
                <nav>
                    <Link to={`/persons`} className='link'>
                        Wróć do Osób
                    </Link>
                </nav>
                <PersonInput 
                init={{
                first_name: person.first_name,
                last_name: person.last_name,
                birth_date: new Date(person.birth_date.split('T')[0]).toLocaleDateString('fr-CA'),
                nationality: person.nationality,
                }} 
                akt={'Edytuj osobę'}
                h={handleSubmitEdit}/>
            </div>
    
        )
    }
    return (
        <div>
            <nav>
                <Link to={`/persons`} className='link'>
                    Wróć do Osób
                </Link>
            </nav>
            <PersonInput 
                init={{
                first_name: '',
                last_name: '',
                birth_date: '',
                nationality:'',
                }} 
                akt={'Dodaj osobę'}
                h={handleSubmitAdd}/>
        </div>
        )
}


const mapStateToProps = (state, props) => {
    return{
        person: state.persons.filter(ele => ele.id === parseInt(props.match.params.id))[0],
    }
}

const mapDispatchToProps = {
    addPerson,
    getPerson,
    editPerson
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonForm));