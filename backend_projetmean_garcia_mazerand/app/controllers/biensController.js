const biensService  = require('../services/biensService');

class BiensController {

    async getBiens() {
        console.info('Controller: getBiens')
        return await biensService.getBiens();
    }

    async getBienById(bienId) {
        console.info('Controller: getBienById', bienId);
        return await biensService.getBienById(bienId);
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

    async createMultipleBiensFromCityAleatoire(nombreBien, city) {
        console.info('Controller: createMultipleBiensFromCityAleatoire', nombreBien, city);
        return await biensService.createMultipleBiensFromCityAleatoire(nombreBien, city);
    }

    async getBiensByCriteria(criteria) {
        console.info('Controller: getBiensByCriteria', criteria);
        return await biensService.getBiensByCriteria(criteria);
    }
}
module.exports = new BiensController();