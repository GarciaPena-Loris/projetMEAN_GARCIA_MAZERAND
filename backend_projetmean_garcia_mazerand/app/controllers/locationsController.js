const locationsService  = require('../services/locationsService');

class LocationsController {

    async getLocations() {
        console.info('Controller: getLocations')
        return await locationsService.getLocations();
    }

    async createLocation(location) {
        console.info('Controller: createLocation', location);
        return await locationsService.createLocation(location);
    }

    async updateLocation(location) {
        console.info('Controller: updateLocation', location);
        return await locationsService.updateLocation(location);
    }

    async deleteLocation(locationId) {
        console.info('Controller: deleteLocation', locationId);
        return await locationsService.deleteLocation(locationId);
    }
}
module.exports = new LocationsController();