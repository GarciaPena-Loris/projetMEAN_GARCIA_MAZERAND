const utilisateurService  = require('../services/utilisateursService');

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
}
module.exports = new UtilisateurController();