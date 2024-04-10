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

}

module.exports = new LocationsService();