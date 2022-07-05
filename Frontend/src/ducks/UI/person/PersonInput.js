import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { nationalities } from "./nationalities";
import * as Yup from 'yup';
import '../../CSS/main.css'


const PersonInput = ({init, akt, h}) => {
    const validInput = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Za krótkie!')
            .max(30, 'Za długie')
            .required('Wymagane!'),
        last_name: Yup.string()
            .min(2, 'Za krótkie!')
            .max(30, 'Za długie')
            .required('Wymagane!'),
        birth_date: Yup.date()
            .typeError('Zła Data!')
            .required('Wymagane!'),
        nationality: Yup.string()
            .required('Wymagane!')
    })
    return (
        <div>
        <Formik 
            initialValues={init}
            validationSchema={validInput}
            onSubmit={(values) => h(values)}
            enableReinitialize={true}
            className='form'>
            {({ errors, touched }) => (
                <Form>
                    <div>   
                    <span>Imie</span>
                    <Field name="first_name" type="text"/>
                    {(errors.first_name && touched.first_name) ? (<div>{errors.first_name}</div>) : null}
                    </div>
                
                    <div>
                    <span>Nazwisko</span>
                    <Field name="last_name" type="text"/>
                    {(errors.last_name && touched.last_name) ? (<div>{errors.last_name}</div>) : null}
                    </div>
                    
                    <div>
                    <span>Data Urodzenia</span>
                    <Field name="birth_date" type="date"/>
                    {(errors.birth_date && touched.birth_date) ? (<div>{errors.birth_date}</div>) : null}
                    </div>

                    <div>
                    <span>Narodowość</span>
                    <Field name="nationality" as="select">
                        {nationalities.map((ele, index) => 
                            <option value={ele} key={index}>{ele}</option>)}
                    </Field>
                    {(errors.nationality && touched.nationality) ? (<div>{errors.nationality}</div>) : null}
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

    }
}

export default withRouter(connect(mapStateToProps, null)(PersonInput));