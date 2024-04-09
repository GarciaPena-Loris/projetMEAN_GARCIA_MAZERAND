const utilisateurRepository = require('../repositories/utilisateursRepository');

class UtilisateurService {

    constructor() {}

    async getUtilisateurs() {
        return await utilisateurRepository.getUtilisateurs();
    }

    async createUtilisateur(utilisateur) {
        return await utilisateurRepository.createUtilisateur(utilisateur);
    }

    async updateUtilisateur(utilisateur) {
        return await utilisateurRepository.updateUtilisateur(utilisateur);
    }

    async deleteUtilisateur(utilisateurId) {
        return await utilisateurRepository.deleteUtilisateur(utilisateurId);
    }

}

module.exports = new UtilisateurService();