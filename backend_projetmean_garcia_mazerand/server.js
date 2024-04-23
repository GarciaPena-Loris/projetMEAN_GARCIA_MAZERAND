const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv').config()

const utilisateursController = require('./app/controllers/utilisateursController')
const biensController = require('./app/controllers/biensController')
const locationsController = require('./app/controllers/locationsController')

const app = express();
const port = process.env.PORT || 3080;

app.use(bodyParser.json());
app.use(cors())
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
});


// Routes pour les utilisateurs
// GET all users
app.get('/api/utilisateurs', (req, res) => {
    utilisateursController.getUtilisateurs().then(data => res.json(data));
});

// POST new user
app.post('/api/utilisateurs', (req, res) => {
    utilisateursController.createUtilisateur(req.body).then(data => res.json(data));
});

// PUT update user
app.put('/api/utilisateurs/:id', (req, res) => {
    utilisateursController.updateUtilisateur(req.params.id, req.body).then(data => res.json(data));
});

// DELETE user
app.delete('/api/utilisateurs/:id', (req, res) => {
    utilisateursController.deleteUtilisateur(req.params.id).then(data => res.json(data));
});

// Register new user
app.post('/api/register', (req, res) => {
    utilisateursController.register(req.body).then(data => res.json(data));
});

// Login user
app.post('/api/login', (req, res, next) => {
    utilisateursController.login(req, res, next);
});


// Routes pour les biens
app.get('/api/biens', (req, res) => {
    biensController.getBiens().then(data => res.json(data));
});

app.get('/api/lastBienId', (req, res) => {
    biensController.getLastBienId().then(data => res.json(data));
});

app.post('/api/bien', (req, res) => {
    biensController.createBien(req.body.bien).then(data => res.json(data));
});

app.put('/api/bien', (req, res) => {
    biensController.updateBien(req.body.bien).then(data => res.json(data));
});

app.delete('/api/bien/:id', (req, res) => {
    biensController.deleteBien(req.params.id).then(data => res.json(data));
});

app.post('/api/creerBienAleatoire', (req, res) => {
    biensController.createBienAleatoire(req.body.mailProprio).then(data => res.json(data));
});

app.post('/api/creerMultipleBienAleatoire', (req, res) => {
    biensController.createMultipleBienAleatoire(req.body.nombreBien).then(data => res.json(data));
});

app.post('/api/creerMultipleBiensFromCityAleatoire', (req, res) => {
    biensController.createMultipleBiensFromCityAleatoire(req.body.nombreBien, req.body.city).then(data => res.json(data));
});

app.post('/api/biens/search', (req, res) => {
    const {criteria} = req.body;
    biensController.getBiensByCriteria(criteria).then(data => res.json(data));
});


// Routes pour les locations
app.get('/api/locations', (req, res) => {
    locationsController.getLocations().then(data => res.json(data));
});

app.post('/api/location', (req, res) => {
    console.info(req.body);
    locationsController.createLocation(req.body.location).then(data => res.json(data));
});

app.put('/api/location', (req, res) => {
    locationsController.updateLocation(req.body.location).then(data => res.json(data));
});

app.delete('/api/location/:id', (req, res) => {
    locationsController.deleteLocation(req.params.id).then(data => res.json(data));
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});


app.listen(port, () => {
    console.info(`Server listening on the port  ${port}`);
})