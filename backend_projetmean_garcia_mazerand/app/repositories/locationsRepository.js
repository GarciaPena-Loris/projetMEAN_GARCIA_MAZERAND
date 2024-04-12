const {connect, disconnect} = require('../../config/db.config');
const {Location} = require('../models/locationsModel');

class LocationsRepository {

    constructor() {
        connect();
    }

    async getLocations() {
        const locations = await Location.find({});
        console.info('Locations récupérés avec succès: ' + locations);
        return locations;
    }

    async createLocation(location) {
        let data = {};
        try {
            data = await Location.create(location);
            console.info('Location créé avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async updateLocation(location) {
        let data = {};
        try {
            data = await Location.updateOne(location);
            console.info('Location mis à jour avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async deleteLocation(locationId) {
        let data = {};
        try {
            data = await Location.deleteOne({_id: locationId});
            console.info('Location supprimé avec succès: ' + data);
        } catch (err) {
            console.error('Error::' + err);
        }
        return {status: `${(data.deletedCount > 0)}`};
    }

    // Recherche de location
    async getLocationsByDate(dateDebut, dateFin) {
        return Location.find({
            dateDebut: {$lte: dateFin},
            dateFin: {$gte: dateDebut}
        });
    }

    // locationsRepository.js
    async getLocationsByStartDate(dateDebut) {
        return Location.find({
            dateFin: {$gte: dateDebut}
        });
    }

    async getLocationsByEndDate(dateFin) {
        return Location.find({
            dateDebut: {$lte: dateFin}
        });
    }

}

module.exports = new LocationsRepository();