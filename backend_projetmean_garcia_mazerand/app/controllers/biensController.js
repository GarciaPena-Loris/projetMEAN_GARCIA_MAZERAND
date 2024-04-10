const biensService  = require('../services/biensService');

class BiensController {

    async getBiens() {
        console.info('Controller: getBiens')
        return await biensService.getBiens();
    }

    async getLastBienId() {
        console.info('Controller: getLastBienId')
        return await biensService.getLastBienId();
    }

    async createBien(bien) {
        console.info('Controller: createBien', bien);
        return await biensService.createBien(bien);
    }

    async updateBien(bien) {
        console.info('Controller: updateBien', bien);
        return await biensService.updateBien(bien);
    }

    async deleteBien(bienId) {
        console.info('Controller: deleteBien', bienId);
        return await biensService.deleteBien(bienId);
    }

    async createBienAleatoire(mailProprio) {
        console.info('Controller: createBienAleatoire', mailProprio);
        return await biensService.createBienAleatoire(mailProprio);
    }

    async createMultipleBienAleatoire(nombreBien) {
        console.info('Controller: createMultipleBien', nombreBien);
        return await biensService.createMultipleBiensAleatoire(nombreBien);
    }
}
module.exports = new BiensController();