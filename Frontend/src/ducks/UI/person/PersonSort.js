import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router";




const PersonSort = ({ h }) => {

     
    return (
        <div>
        <Formik 
            initialValues={{sort: ''}}
            enableReinitialize={true}>
            <Form onChange={(v) => h(v.target.value)}>
                <Field name="sort" as="select" >
                    <option defaultValue>Wybierz</option>
                    <option value={'alf'}>A-Z</option>
                    <option value={'alfr'}>Z-A</option>
                    <option value={'year'}>Rok rosnąco</option>
                    <option value={'yearr'}>Rok malejąco</option>
                </Field>
            </Form>
        </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        
    }
}


export default withRouter(connect(mapStateToProps, null)(PersonSort));