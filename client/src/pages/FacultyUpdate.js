import axios from "axios";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import FacultyForm from "../componets/FacultyForm";


function FacultyUpdate() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        animal: '',
        element: '',
        magicSchool: '',
    })

    const [MagicSchools, setMagicSchools] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/faculty/update/${id}`).then((response) => {
            setMagicSchools(response.data.magicSchools)
            setFormData(response.data.faculty)
            console.log(response.data)
        });
    }, [id]);
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:3001/faculty/update/${id}`, formData)
            .then(response => {
                console.log(response.data);
                navigate('/faculty');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Container>
            <h1 className="text-center">Faculty Update</h1>
            <FacultyForm buttonText={'Update'} faculty={formData} magicSchools={MagicSchools}
                         handleSubmit={handleSubmit}  handleChange={handleChange}/>
        </Container>
    );
}
export default FacultyUpdate;