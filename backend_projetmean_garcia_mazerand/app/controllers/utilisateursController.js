const utilisateurService  = require('../services/utilisateursService');
const bcrypt = require('bcrypt');

class UtilisateurController {

    async getUtilisateurs() {
        console.info('Controller: getUtilisateurs')
        return await utilisateurService.getUtilisateurs();
    }

    async createUtilisateur(utilisateur) {
        console.info('Controller: createUtilisateur', utilisateur);
        return await utilisateurService.createUtilisateur(utilisateur);
    }

    async updateUtilisateur(utilisateur) {
        console.info('Controller: updateUtilisateur', utilisateur);
        return await utilisateurService.updateUtilisateur(utilisateur);
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

    async login(email, password) {
        console.info('Controller: login', email);
        const utilisateur = await utilisateurService.getUtilisateurByEmail(email);
        if (utilisateur && await bcrypt.compare(password, utilisateur.mdp)) {
            return utilisateur; // Login successful
        }
        throw new Error('Invalid email or password');
    }
}
module.exports = new UtilisateurController();