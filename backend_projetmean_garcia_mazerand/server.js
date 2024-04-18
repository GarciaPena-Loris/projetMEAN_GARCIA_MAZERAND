const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const utilisateursController = require('./app/controllers/utilisateursController')
const biensController = require('./app/controllers/biensController')
const locationsController = require('./app/controllers/locationsController')

const app = express();
const port = process.env.PORT || 3080;

app.use(bodyParser.json());

// Routes pour les utilisateurs
app.get('/api/utilisateurs', (req, res) => {
    utilisateursController.getUtilisateurs().then(data => res.json(data));
});

app.post('/api/utilisateur', (req, res) => {
    console.info(req.body);
    utilisateursController.createUtilisateur(req.body.utilisateur).then(data => res.json(data));
});

app.put('/api/utilisateur', (req, res) => {
    utilisateursController.updateUtilisateur(req.body.utilisateur).then(data => res.json(data));
});

app.delete('/api/utilisateur/:id', (req, res) => {
    utilisateursController.deleteUtilisateur(req.params.id).then(data => res.json(data));
});

app.post('/api/register', (req, res) => {
    utilisateursController.register(req.body.utilisateur).then(data => res.json(data));
});

app.post('/api/login', (req, res) => {
    utilisateursController.login(req.body.email, req.body.password).then(data => res.json(data));
});


// Routes pour les biens
app.get('/api/biens', (req, res) => {
    biensController.getBiens().then(data => res.json(data));
});

app.get('/api/lastBienId', (req, res) => {
    biensController.getLastBienId().then(data => res.json(data));
});

app.post('/api/bien', (req, res) => {
    console.info(req.body);
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

app.get('/api/biens/search', (req, res) => {
    const { criteria } = req.body;
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