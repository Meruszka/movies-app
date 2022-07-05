import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as Yup from 'yup';
import { getPersons } from "../../Persons/actions";
import '../../CSS/main.css'



const MovieInput = ({init, h, akt, persons, getPersons}) => {
    const genres = [
        'Akcja',
        'Komedia',
        'Dramat',
        'Fantasy',
        'Horror',
        'Romans',
        'Kryminał',
        'Western',
    ]
    useEffect(() => {
        if(!!persons){
            getPersons()
        }
    }, [])
    const validInput = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Za krótkie!')
            .max(50, 'Za długie')
            .required('Wymagane!'),
        genre: Yup.string()
            .min(2, 'Za krótkie!')
            .max(30, 'Za długie')
            .required('Wymagane!'),
        release_date: Yup.date()
            .typeError('Zła Data!')
            .required('Wymagane!'),
        description: Yup.string()
            .min(2, 'Za krótkie!')
            .required('Wymagane!'),
        image_url: Yup.string()
            .url('Zły format urla!')
            .required('Wymagane!'),
        director_id: Yup.string()

    })
    return (
        <div>
        <Formik 
            initialValues={init}
            onSubmit={(values) => h(values)}
            validationSchema={validInput}
            enableReinitialize={true}
            className='form'>
            {({errors, touched}) => (
                <Form>
                    <div>
                    <span>Tytuł</span>
                    <Field name="title" type="text"/>
                    {(errors.title && touched.title) ? (<div>{errors.title}</div>) : null}
                    </div>

                    <div>
                    <span>Rok wydania</span>
                    <Field name="release_date" type="date"/>
                    {(errors.release_date && touched.release_date) ? (<div>{errors.release_date}</div>) : null}
                    </div>
                    
                    <div>
                    <span>Gatunek</span>
                    <Field name="genre" as="select">
                        <option defaultValue>Wybierz</option>
                        {genres.map((g, index) =>
                            <option key={index} value={g}>{g}</option>
                        )}
                    </Field>
                    {(errors.genre && touched.genre) ? (<div>{errors.genre}</div>) : null}
                    </div>
                    
                    <div>

                    <span>Opis</span>
                    <Field name="description" type="text"/>
                    {(errors.description && touched.description) ? (<div>{errors.description}</div>) : null}
                    </div>
                    <div>

                    <span>Reżyser</span>
                    <Field name="director_id" as="select">
                        <option defaultValue>Wybierz</option>
                        {persons.map((ele, index) => 
                             <option key={index} value={ele.id}>{ele.first_name} {ele.last_name}</option>
                        )}
                    </Field>
                    {(errors.director_id && touched.director_id) ? (<div>{errors.director_id}</div>) : null}
                    </div>

                    <div>
                    <span>Img Url</span>
                    <Field name="image_url" type="text"/>
                    {(errors.image_url && touched.image_url) ? (<div>{errors.image_url}</div>) : null}
                    </div>
                    <div>

                    <button type="submit">
                        {akt}
                    </button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return{
        movie: state.movies.filter(ele => ele.id === parseInt(props.match.params.id))[0],
        persons: state.persons || []
    }
}
const mapDispatchToProps = {
    getPersons
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieInput));