import axios from "axios";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import FacultyForm from "../componets/FacultyForm";


function FacultyCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        animal: '',
        element: '',
        magicSchool: '',
    })
    const [MagicSchools, setMagicSchools] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/faculty/create").then((response) => {
            setMagicSchools(response.data.magicSchools)
            console.log(response.data.magicSchools)
        });
    }, []);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/faculty/create', formData)
            .then(response => {
                console.log(response.data);
                navigate('/faculty');
            })
            .catch(error => {
                console.log(formData);
                console.log(error);
            });
    }
    return (
        <Container>
            <h1 className="text-center">Magic School Create</h1>
            <FacultyForm buttonText={'Create'} faculty={formData} magicSchools={MagicSchools}
                             handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default FacultyCreate;