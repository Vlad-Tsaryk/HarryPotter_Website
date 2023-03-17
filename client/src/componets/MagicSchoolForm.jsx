import React from 'react';
import { Form,Input, Label } from 'reactstrap';
import MyButton from "./UI/button/MyButton";
const MagicSchoolForm = (props) => {

    return (
        <Form  onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Label htmlFor="name" className="form-label">Name:</Label>
                <Input type="text" id="name" value={props.magicSchool.name}
                       className="form-control" name="name" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="country" className="form-label">Country:</Label>
                <Input type="text" id="country" value={props.magicSchool.country}
                       className="form-control" name="country" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="founded" className="form-label">Founded:</Label>
                <Input type="date" id="founded" value={props.magicSchool.founded}
                       className="form-control" name="founded" onChange={props.handleChange} required/>
            </div>
            <MyButton type="submit">{props.buttonText}</MyButton>
        </Form>
    );
};

export default MagicSchoolForm;