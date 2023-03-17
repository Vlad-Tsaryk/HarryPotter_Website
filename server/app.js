const sequelize = require('./db');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json()) // for parsing application/json
app.use(cors())
app.use(express.static('public'));//static
const Ghost = require('./models/ghost');
const Faculty = require('./models/faculty');
const MagicSchool = require('./models/magic_school');
const Wizard = require('./models/wizard');
// sequelize.sync()
// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

///////////////////*Magic School views*////////////////////////////////

// // Set up a route to display a list of users
app.get('/magic_school', async (req, res) => {
    const magicSchools = await MagicSchool.findAll({order: ['id']});
    // res.render('magic_school/magic_school_list', { magicSchools:magicSchools});
    res.json(magicSchools);
});
app.post('/magic_school/create', async (req, res) => {
    const { name, founded,country  } = req.body;
    try {
        const magicSchool = await MagicSchool.create({
            name,
            founded,
            country,
        });
        res.json(magicSchool);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('/magic_school/update/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const magicSchool = await MagicSchool.findByPk(id);
        res.json(magicSchool);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post('/magic_school/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, founded,country  } = req.body;

    try {
        const magicSchool = await MagicSchool.findByPk(id);
        if (!magicSchool) {
            return res.status(404).send('Magic school not found');
        }
        magicSchool.name = name;
        magicSchool.founded = founded;
        magicSchool.country = country;
        await magicSchool.save();
        res.status(200).json(magicSchool);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/magic_school/delete/:id', async (req, res) => {
    try {
        const magicSchoolId = req.params.id;
        await MagicSchool.destroy({ where: { id: magicSchoolId } });
        res.status(204).send()
        // res.redirect('/magic_school');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the magic school.');
    }
});
///////////////////*Faculty views*////////////////////////////////
app.get('/faculty', async (req, res) => {
    const faculties = await Faculty.findAll({order: ['id'],include: MagicSchool});
    res.json(faculties);
});
app.get('/faculty/create',async (req, res) => {
    const magicSchools = await MagicSchool.findAll();
    res.status(200).json({magicSchools:magicSchools});
});
app.post('/faculty/create', async (req, res) => {
    const { name,animal,element,magicSchool  } = req.body;
    try {
        const faculty = await Faculty.create({
            name,
            animal,
            element,
            magicSchool
        });
        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('/faculty/update/:id', async (req, res) => {
    const id = req.params.id;
    const magicSchools = await MagicSchool.findAll();
    try {
        const faculty = await Faculty.findByPk(id);
        res.status(200).json({ faculty: faculty, magicSchools:magicSchools});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post('/faculty/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name,animal,element,magicSchool  } = req.body;
    try {
        const faculty = await Faculty.findByPk(id);
        if (!faculty) {
            return res.status(404).send('Faculty not found');
        }
        faculty.name = name;
        faculty.animal = animal;
        faculty.element = element;
        faculty.magicSchool = magicSchool;
        await faculty.save();
        res.status(200).json(faculty);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/faculty/delete/:id', async (req, res) => {
    try {
        const facultyId = req.params.id;
        await Faculty.destroy({ where: { id: facultyId } });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the faculty.');
    }
});
///////////////////*Wizard views*////////////////////////////////
app.get('/wizard', async (req, res) => {
    const wizards = await Wizard.findAll({order: ['id'], include: Faculty});
    res.status(200).json(wizards);
    // res.render('wizard/wizard_list', { wizards:wizards});
});
app.get('/wizard/create',async (req, res) => {
    const faculties = await Faculty.findAll();
    res.status(200).json(faculties);
});
app.post('/wizard/create', async (req, res) => {
    const { firstName,lastName,dateOfBirth,bloodStatus,gender,faculty  } = req.body;
    try {
        const wizard = await Wizard.create({
            firstName,
            lastName,
            dateOfBirth,
            bloodStatus,
            gender,
            faculty
        });
        res.status(201).json(wizard);
        // res.redirect('/wizard');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('/wizard/update/:id', async (req, res) => {
    const id = req.params.id;
    const faculties = await Faculty.findAll();
    try {
        const wizard = await Wizard.findByPk(id);
        res.status(200).json({faculties: faculties, wizard: wizard});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post('/wizard/update/:id', async (req, res) => {
    const id = req.params.id;
    const {firstName,lastName,dateOfBirth,bloodStatus,gender,faculty} = req.body;
    try {
        const wizard = await Wizard.findByPk(id);
        if (!wizard) {
            return res.status(404).send('Wizard not found');
        }
        wizard.firstName = firstName;
        wizard.lastName = lastName;
        wizard.dateOfBirth = dateOfBirth;
        wizard.bloodStatus = bloodStatus;
        wizard.gender = gender;
        wizard.faculty = faculty;
        await wizard.save();
        res.status(200).json(wizard);
        // res.redirect('/wizard');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/wizard/delete/:id', async (req, res) => {
    try {
        const wizardId = req.params.id;
        await Wizard.destroy({ where: { id: wizardId } });
        res.status(204).send();
        // res.redirect('/wizard');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the wizard.');
    }
});
///////////////////*Ghost views*////////////////////////////////
app.get('/ghost', async (req, res) => {
    const ghosts = await Ghost.findAll({order: ['id'], include:Faculty});
    res.status(200).json(ghosts);
    // res.render('ghost/ghost_list', { ghosts:ghosts});
});
app.get('/ghost/create',async (req, res) => {
    const faculties = await Faculty.findAll();
    res.status(200).json(faculties);
    // res.render('ghost/ghost_create',{faculties:faculties});
});
app.post('/ghost/create', async (req, res) => {
    const { fullName,born,died,gender,faculty  } = req.body;
    try {
        const ghost = await Ghost.create({
            fullName,
            born,
            died,
            gender,
            faculty
        });
        res.status(201).json(ghost);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('/ghost/update/:id', async (req, res) => {
    const id = req.params.id;
    const faculties = await Faculty.findAll();
    try {
        const ghost = await Ghost.findByPk(id);
        res.status(200).json({ faculties: faculties, ghost: ghost});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post('/ghost/update/:id', async (req, res) => {
    const id = req.params.id;
    const { fullName,born,died,gender,faculty  } = req.body;
    try {
        const ghost = await Ghost.findByPk(id);
        if (!ghost) {
            return res.status(404).send('Ghost not found');
        }
        ghost.fullName = fullName;
        ghost.born = born;
        ghost.died = died;
        ghost.gender = gender;
        ghost.faculty = faculty;
        await ghost.save();
        res.status(200).json(ghost);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/ghost/delete/:id', async (req, res) => {
    try {
        const ghostId = req.params.id;
        await Ghost.destroy({ where: { id: ghostId } });
        res.status(204).send();
        // res.redirect('/ghost');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the ghost.');
    }
});