const {connect, disconnect} = require('../../config/db.config');
const {Bien} = require('../models/biensModel');

class BiensRepository {

    constructor() {
        connect();
    }

    async getBiens() {
        const biens = await Bien.find({});
        console.info('Biens récupérés avec succès: ' + biens);
        return biens;
    }

    async getLastBienId() {
        const bien = await Bien.find({}).sort({idBien: -1}).limit(1);
        if (bien.length === 0) {
            return {idBien: 0};
        }
        console.info('Dernier id : ' + bien[0].idBien);
        return bien[0].idBien;
    }

    async createBien(bien) {
        let data = {};
        try {
            data = await Bien.create(bien);
            console.info('Bien créé avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async updateBien(bien) {
        let data = {};
        try {
            data = await Bien.updateOne(bien);
            console.info('Bien mis à jour avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async deleteBien(bienId) {
        let data = {};
        try {
            data = await Bien.deleteOne({_id: bienId});
            console.info('Bien supprimé avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return {status: `${(data.deletedCount > 0)}`};
    }

}

module.exports = new BiensRepository();