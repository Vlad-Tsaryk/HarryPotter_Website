import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Table, Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import MyButton from "../componets/UI/button/MyButton";
import {useNavigate} from "react-router-dom";

function Ghosts() {
    const navigate = useNavigate();
    const [ghosts, setGhosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/ghost").then((response) => {
            setGhosts(response.data);
            console.log(response.data)
        });
    }, []);
    const deleteWizard = (value) =>{
        axios.delete(`http://localhost:3001/ghost/delete/${value.id}`)
            .then(response => {
                setGhosts(ghosts.filter(faculty => faculty.id !== value.id));
            }).catch(e => {
            console.log(e);
        });
    }

    return (
        <Container>
            <h1 className="text-center">Ghosts List</h1>
            <Table className={'table-success table-striped-columns table-hover'}>
                <thead><tr>
                    <th scope="col">id</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Born</th>
                    <th scope="col">Died</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Faculty</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {ghosts.map((value, index) => {
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
                            {value.fullName}
                        </td>
                        <td>
                            {value.born}
                        </td>
                        <td>
                            {value.died}
                        </td>
                        <td>
                            {gender}
                        </td>
                        <td>
                            {value.Faculty.name}
                        </td>
                        <td width="105">
                            <a  onClick={(e) =>{e.preventDefault(); navigate(`/ghost/update/${value.id}`)}}
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
                navigate('/ghost/create');
            }}>Create ghost</MyButton>
        </Container>
    );
}

export default Ghosts;