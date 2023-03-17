import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import MyButton from "./UI/button/MyButton";
const GhostForm = (props) => {

    return (
        <Form  onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Label htmlFor="fullName" className="form-label">Full Name:</Label>
                <Input type="text" id="fullName" value={props.ghost.fullName}
                       className="form-control" name="fullName" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="born" className="form-label">Born:</Label>
                <Input type="date" id="born" value={props.ghost.born}
                       className="form-control" name="born" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="died" className="form-label">Died:</Label>
                <Input type="date" id="died" value={props.ghost.died}
                       className="form-control" name="died" onChange={props.handleChange} required/>
            </div>
            <Label htmlFor="gender" className="form-label">Gender:</Label>
            <FormGroup check>
                <Input
                    id={'gender_male'}
                    name="gender"
                    type="radio"
                    value='1'
                    onChange={props.handleChange}
                    checked={props.ghost.gender === true}
                />
                {' '}
                <Label check>Male
                </Label>


            </FormGroup>
            <FormGroup>
                <Input
                    id={'gender_female'}
                    name="gender"
                    type="radio"
                    value='0'
                    onChange={props.handleChange}
                    checked={props.ghost.gender === false}
                />
                {' '}
                <Label check>
                    Female
                </Label>
            </FormGroup>

            <div className="mb-3">
                <Label htmlFor="faculty" className="form-label">Faculty:</Label>
                <Input id="faculty" name="faculty"
                       type="select" value={props.ghost.faculty} onChange={props.handleChange} required>
                    <option></option>
                    {props.faculties.map((value, index) =>{
                        return <option key={value.id} value={value.id}>{value.name}</option>
                    })}
                </Input>
            </div>

            <MyButton type="submit">{props.buttonText}</MyButton>
        </Form>
    );
};

export default GhostForm;