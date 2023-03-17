import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import MyButton from "./UI/button/MyButton";
const WizardForm = (props) => {

    return (
        <Form  onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Label htmlFor="firstName" className="form-label">First Name:</Label>
                <Input type="text" id="firstName" value={props.wizard.firstName}
                       className="form-control" name="firstName" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="lastName" className="form-label">Last Name:</Label>
                <Input type="text" id="lastName" value={props.wizard.lastName}
                       className="form-control" name="lastName" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="dateOfBirth" className="form-label">Date Of Birth:</Label>
                <Input type="date" id="dateOfBirth" value={props.wizard.dateOfBirth}
                       className="form-control" name="dateOfBirth" onChange={props.handleChange} required/>
            </div>
            <div className="mb-3">
                <Label htmlFor="bloodStatus" className="form-label">Blood Status:</Label>
                <Input type="select" id="bloodStatus" value={props.wizard.bloodStatus}
                       className="form-control" name="bloodStatus" onChange={props.handleChange} required>
                <option></option>
                <option value="Half-blood">Half-blood</option>
                <option value="Pure-blood">Pure-blood</option>
                <option value="Muggle-born">Muggle-born</option>
                <option value="Squibs">Squibs</option>
                <option value="Half-breed">Half-breeds</option>
                </Input>
            </div>
            <Label htmlFor="gender" className="form-label">Gender:</Label>
            <FormGroup check>
                <Input
                    id={'gender_male'}
                    name="gender"
                    type="radio"
                    value='1'
                    onChange={props.handleChange}
                    checked={props.wizard.gender === true}
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
                    checked={props.wizard.gender === false}
                />
                {' '}
                <Label check>
                    Female
                </Label>
            </FormGroup>

            <div className="mb-3">
                <Label htmlFor="faculty" className="form-label">Faculty:</Label>
                <Input id="faculty" name="faculty"
                       type="select" value={props.wizard.faculty} onChange={props.handleChange} required>
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

export default WizardForm;