const utilisateurService = require('../services/utilisateursService');
const bcrypt = require('bcrypt');

class UtilisateurController {

    async getUtilisateurs() {
        console.info('Controller: getUtilisateurs');
        return await utilisateurService.getUtilisateurs();
    }

    async createUtilisateur(utilisateur) {
        console.info('Controller: createUtilisateur', utilisateur);
        return await utilisateurService.createUtilisateur(utilisateur);
    }

    async updateUtilisateur(utilisateurId, utilisateur) {
        console.info('Controller: updateUtilisateur', utilisateurId, utilisateur);
        return await utilisateurService.updateUtilisateur(utilisateurId, utilisateur);
    }

    async deleteUtilisateur(utilisateurId) {
        console.info('Controller: deleteUtilisateur', utilisateurId);
        return await utilisateurService.deleteUtilisateur(utilisateurId);
    }

    async register(utilisateur) {
        console.info('Controller: register', utilisateur);
        // Hash the password
        utilisateur.mdp = await bcrypt.hash(utilisateur.mdp, 10);
        return await utilisateurService.createUtilisateur(utilisateur);
    }

    async login(req, res, next) {
        console.info('Controller: login', req.body.mail);
        try {
            const utilisateur = await utilisateurService.getUtilisateurByEmail(req.body.mail);
            if (utilisateur && await bcrypt.compare(req.body.mdp, utilisateur.mdp)) {
                return res.json(utilisateur); // Login successful
            }
            throw new Error('Invalid email or password');
        } catch (error) {
            next(error); // Pass the error to the Express error handler
        }
    }

}

module.exports = new UtilisateurController();