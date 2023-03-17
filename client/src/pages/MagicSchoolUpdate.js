import axios from "axios";
import {Container} from "reactstrap";
import MagicSchoolForm from "../componets/MagicSchoolForm";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';


function MagicSchoolUpdate() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        founded: ''
    })
    useEffect(() => {
        axios.get(`http://localhost:3001/magic_school/update/${id}`).then((response) => {
            setFormData(response.data);
        });
    }, [id]);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:3001/magic_school/update/${id}`, formData)
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
            <h1 className="text-center">Magic School Update</h1>
            <MagicSchoolForm buttonText={'Update'} magicSchool={formData}
                             handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default MagicSchoolUpdate;