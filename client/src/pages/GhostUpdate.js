import axios from "axios";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import GhostForm from "../componets/GhostForm";


function GhostUpdate() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [formData, setFormData] = useState({
        fullName: '',
        born: '',
        died: '',
        gender: true,
        faculty: '',
    })
    const [faculties, setFaculties] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/ghost/update/${id}`).then((response) => {
            setFaculties(response.data.faculties)
            setFormData(response.data.ghost)
        });
    }, [id]);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:3001/ghost/update/${id}`, formData)
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
            <GhostForm buttonText={'Update'} ghost={formData} faculties={faculties}
                       handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default GhostUpdate;