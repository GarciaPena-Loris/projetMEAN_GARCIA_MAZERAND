const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const utilisateurController = require('./app/controllers/utilisateursController')


const app = express();
const port = process.env.PORT || 3080;

app.use(bodyParser.json());

app.get('/api/utilisateurs', (req, res) => {
    utilisateurController.getUtilisateurs().then(data => res.json(data));
});

app.post('/api/utilisateur', (req, res) => {
    console.info(req.body);
    utilisateurController.createUtilisateur(req.body.utilisateur).then(data => res.json(data));
});

app.put('/api/utilisateur', (req, res) => {
    utilisateurController.updateUtilisateur(req.body.utilisateur).then(data => res.json(data));
});

app.delete('/api/utilisateur/:id', (req, res) => {
    utilisateurController.deleteUtilisateur(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.info(`Server listening on the port  ${port}`);
})