import axios from "axios";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import GhostForm from "../componets/GhostForm";


function GhostCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        born: '',
        died: '',
        gender: true,
        faculty: '',
    })
    const [faculties, setFaculties] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/ghost/create").then((response) => {
            setFaculties(response.data)
        });
    }, []);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/ghost/create', formData)
            .then(response => {
                console.log(response.data);
                navigate('/ghost');
            })
            .catch(error => {
                console.log(formData);
                console.log(error);
            });
    }
    return (
        <Container>
            <h1 className="text-center">Ghost Create</h1>
            <GhostForm buttonText={'Create'} ghost={formData} faculties={faculties}
                        handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default GhostCreate;