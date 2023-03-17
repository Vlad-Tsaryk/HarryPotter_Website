import axios from "axios";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import WizardForm from "../componets/WizardForm";


function WizardUpdate() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        bloodStatus: '',
        gender: true,
        faculty: '',
    })
    const [faculties, setFaculties] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/wizard/update/${id}`).then((response) => {
            setFaculties(response.data.faculties)
            setFormData(response.data.wizard)
        });
    }, [id]);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:3001/wizard/update/${id}`, formData)
            .then(response => {
                console.log(response.data);
                navigate('/wizard');
            })
            .catch(error => {
                console.log(formData);
                console.log(error);
            });
    }
    return (
        <Container>
            <h1 className="text-center">Wizard Create</h1>
            <WizardForm buttonText={'Update'} wizard={formData} faculties={faculties}
                        handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default WizardUpdate;