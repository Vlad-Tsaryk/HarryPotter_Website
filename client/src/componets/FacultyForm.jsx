import React from 'react';
import { Form,Input, Label } from 'reactstrap';
import MyButton from "./UI/button/MyButton";
const FacultyForm = (props) => {

    return (
        <Form  onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Label htmlFor="name" className="form-label">Name:</Label>
                <Input type="text" id="name" value={props.faculty.name}
                       className="form-control" name="name" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="animal" className="form-label">Animal:</Label>
                <Input type="text" id="animal" value={props.faculty.animal}
                       className="form-control" name="animal" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="element" className="form-label">Element:</Label>
                <Input type="text" id="element" value={props.faculty.element}
                       className="form-control" name="element" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="magicSchool" className="form-label">Magic School:</Label>
                <Input id="magicSchool" name="magicSchool"
                    type="select" value={props.faculty.magicSchool} onChange={props.handleChange} required>
                    <option></option>
                    {props.magicSchools.map((value, index) =>{
                    return <option key={value.id} value={value.id}>{value.name}</option>
                })}
                </Input>
            </div>
            <MyButton type="submit">{props.buttonText}</MyButton>
        </Form>
    );
};

export default FacultyForm;