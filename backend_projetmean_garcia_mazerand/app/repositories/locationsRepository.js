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

    async getLocationByBienId(bienId) {
        const location = await Location.find({idBien: bienId});
        console.info('Location récupéré avec succès: ' + location);
        return location;
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

    async getLocationsByUserEmail(userEmail) {
        return Location.find({mailLoueur: userEmail});
    }

    async getReservationsByBienId(bienId) {
        const locations = await Location.find({idBien: bienId});
        return locations.map(location => ({dateDebut: location.dateDebut, dateFin: location.dateFin}));
    }

    async addReviewToLocation(locationId, review) {
        return Location.updateOne({_id: locationId}, {$push: {avis: review}});
    }

}

module.exports = new LocationsRepository();