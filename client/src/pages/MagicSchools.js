import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Table, Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import MyButton from "../componets/UI/button/MyButton";
import {useNavigate} from "react-router-dom";

function MagicSchools() {
    const navigate = useNavigate();
    const [magicSchools, setMagicSchools] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/magic_school").then((response) => {
            setMagicSchools(response.data);
        });
    }, []);
    const deleteMagicSchool = (value) =>{
        axios.delete(`http://localhost:3001/magic_school/delete/${value.id}`)
        .then(response => {
            setMagicSchools(magicSchools.filter(magicSchool => magicSchool.id !== value.id));
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <Container>
                    <h1 className="text-center">Magic School List</h1>
                    <Table className={'table-success table-striped-columns table-hover'}>
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Founded</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {magicSchools.map((value, index) => {
                            return <tr key={index}>
                                <th scope="row">
                                    {value.id}
                                </th>
                                <td>
                                    {value.name}
                                </td>
                                <td>
                                    {value.country}
                                </td>
                                <td>
                                    {value.founded}
                                </td>
                                <td width="105">
                                    <a onClick={(e) =>{e.preventDefault(); navigate(`/magic_school/update/${value.id}`)}}
                                        className="btn" role="button">
                                        <FontAwesomeIcon icon={faPen} />
                                    </a>
                                    <a onClick={() => deleteMagicSchool(value)} className="btn" role="button">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                </td>
                            </tr>;
                        })}
                        </tbody>
                    </Table>
            <MyButton  onClick={(e) => {
                e.preventDefault();
                navigate('/magic_school/create');
            }}>Create magic school</MyButton>
        </Container>
    );
}

export default MagicSchools;