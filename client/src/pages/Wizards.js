import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Table, Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import MyButton from "../componets/UI/button/MyButton";
import {useNavigate} from "react-router-dom";

function Wizards() {
    const navigate = useNavigate();
    const [wizards, setWizards] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/wizard").then((response) => {
            setWizards(response.data);
            console.log(response.data)
        });
    }, []);
    const deleteWizard = (value) =>{
        axios.delete(`http://localhost:3001/wizard/delete/${value.id}`)
            .then(response => {
                setWizards(wizards.filter(faculty => faculty.id !== value.id));
            }).catch(e => {
            console.log(e);
        });
    }

    return (
        <Container>
            <h1 className="text-center">Wizards List</h1>
            <Table className={'table-success table-striped-columns table-hover'}>
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col">Blood status</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Faculty</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {wizards.map((value, index) => {
                    let gender = ''
                    if (value.gender){
                        gender = 'Male'
                    }
                    else{
                        gender = 'Female'
                    }
                    return <tr key={index}>
                        <th scope="row">
                            {value.id}
                        </th>
                        <td>
                            {value.firstName}
                        </td>
                        <td>
                            {value.lastName}
                        </td>
                        <td>
                            {value.dateOfBirth}
                        </td>
                        <td>
                            {value.bloodStatus}
                        </td>
                        <td>
                            {gender}
                        </td>
                        <td>
                            {value.Faculty.name}
                        </td>
                        <td width="105">
                            <a onClick={(e) =>{e.preventDefault(); navigate(`/wizard/update/${value.id}`)}}
                                className="btn" role="button">
                                <FontAwesomeIcon icon={faPen} />
                            </a>
                            <a onClick={() => deleteWizard(value)} className="btn" role="button">
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </td>
                    </tr>;
                })}
                </tbody>
            </Table>
            <MyButton  onClick={(e) => {
                e.preventDefault();
                navigate('/wizard/create');
            }}>Create wizard</MyButton>
        </Container>
    );
}

export default Wizards;