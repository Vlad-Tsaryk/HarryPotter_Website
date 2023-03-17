import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Table, Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import MyButton from "../componets/UI/button/MyButton";
import {useNavigate} from "react-router-dom";

function Faculties() {
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/faculty").then((response) => {
            setFaculties(response.data);
            console.log(response.data)
        });
    }, []);
    const deleteFaculty = (value) =>{
        axios.delete(`http://localhost:3001/faculty/delete/${value.id}`)
            .then(response => {
                setFaculties(faculties.filter(faculty => faculty.id !== value.id));
            }).catch(e => {
            console.log(e);
        });
    }

    return (
        <Container>
            <h1 className="text-center">Faculties List</h1>
            <Table className={'table-success table-striped-columns table-hover'}>
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Animal</th>
                    <th scope="col">Element</th>
                    <th scope="col">Magic school</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {faculties.map((value, index) => {
                    return <tr key={index}>
                        <th scope="row">
                            {value.id}
                        </th>
                        <td>
                            {value.name}
                        </td>
                        <td>
                            {value.animal}
                        </td>
                        <td>
                            {value.element}
                        </td>
                        <td>
                            {value.MagicSchool.name}
                        </td>
                        <td width="105">
                            <a  onClick={(e) =>{e.preventDefault(); navigate(`/faculty/update/${value.id}`)}}
                                className="btn" role="button">
                                <FontAwesomeIcon icon={faPen} />
                            </a>
                            <a onClick={() => deleteFaculty(value)} className="btn" role="button">
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </td>
                    </tr>;
                })}
                </tbody>
            </Table>
            <MyButton  onClick={(e) => {
                e.preventDefault();
                navigate('/faculty/create');
            }}>Create faculty</MyButton>
        </Container>
    );
}

export default Faculties;