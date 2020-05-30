import {
    reduxForm,
    Field,
    InjectedFormProps,
} from "redux-form";
import { PROVINCES, renderSelect, renderTextField } from "./FormHelpers";
import React from "react";
import { Button } from "@material-ui/core";

const validate = (values: any) => {
    const errors: any = {};
    const requiredFields = ['shop-name', 'shop-city', 'shop-address']
    requiredFields.forEach(field => {
        if(!values[field]){
            errors[field] = 'Required'
        }
    })
    return errors;
}


const RegisterBarbershopForm = (props: InjectedFormProps) => {
    return(
    <form>
        <div className="form-fields">
            <Field name="shop-name" component={renderTextField}
                   label="Barbershop Name" placeholder="Name of Barbershop"  fieldWidth="regular"/>
            <Field name="shop-address" component={renderTextField}
                   label="Street Address" placeholder="Street Address"  fieldWidth="regular"/>
        <div className="two-fields-inline">
            <Field name="shop-city" component={renderTextField}
                   label="City" placeholder="City" fieldWidth="small"/>
            <Field name="shop-province" component={renderSelect} id="rbs-province-select"
                   label="Province" placeholder="Province" fieldWidth="small" options={PROVINCES}/>
        </div>
        </div>
        <div className="form-buttons">
             <Button variant="contained" color="primary"
                     type="button" disabled={props.pristine || props.submitting}>Submit</Button>
        </div>
    </form>
    )
}

let RBSForm = reduxForm({
    form: 'register-barbershop',
    validate
})(RegisterBarbershopForm)

export default RBSForm;