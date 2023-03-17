import axios from "axios";
import {Container} from "reactstrap";
import MagicSchoolForm from "../componets/MagicSchoolForm";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';


function MagicSchoolCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            name: '',
            country: '',
            founded: ''
    })
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/magic_school/create', formData)
            .then(response => {
                console.log(response.data);
                navigate('/magic_school');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Container>
            <h1 className="text-center">Magic School Create</h1>
            <MagicSchoolForm buttonText={'Create'} magicSchool={formData}
                             handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default MagicSchoolCreate;