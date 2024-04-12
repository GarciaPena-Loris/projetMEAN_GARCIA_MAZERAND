const locationsRepository = require('../repositories/locationsRepository');

class LocationsService {

    constructor() {}

    async getLocations() {
        return await locationsRepository.getLocations();
    }

    async createLocation(location) {
        return await locationsRepository.createLocation(location);
    }

    async updateLocation(location) {
        return await locationsRepository.updateLocation(location);
    }

    async deleteLocation(locationId) {
        return await locationsRepository.deleteLocation(locationId);
    }

    // Recherche de location
    async getLocationsByDate(dateDebut, dateFin) {
        // Vérifier si les dates sont fournies
        if (dateDebut && dateFin) {
            return await locationsRepository.getLocationsByDate(dateDebut, dateFin);
        } else if (dateDebut) {
            return await locationsRepository.getLocationsByStartDate(dateDebut);
        } else if (dateFin) {
            return await locationsRepository.getLocationsByEndDate(dateFin);
        } else {
            // Si aucune date n'est fournie, retourner un tableau vide
            return [];
        }
    }

}

module.exports = new LocationsService();