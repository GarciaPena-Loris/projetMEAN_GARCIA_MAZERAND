const locationsService  = require('../services/locationsService');

class LocationsController {

    async getLocations() {
        console.info('Controller: getLocations')
        return await locationsService.getLocations();
    }

    async getLocationByBienId(bienId) {
        console.info('Controller: getLocationByBienId', bienId);
        return await locationsService.getLocationByBienId(bienId);
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

    async createFakeReservations() {
        console.info('Controller: createFakeReservations');
        return await locationsService.createFakeReservations();
    }

    async showFakeReservations() {
        console.info('Controller: showFakeReservations');
        return await locationsService.showFakeReservations();
    }

    async getReservationsByBienId(req, res) {
        try {
            console.info('Controller: getReservationsByBienId', req.params.bienId);
            const bienId = req.params.bienId;
            const reservations = await locationsService.getReservationsByBienId(bienId);
            res.status(200).json(reservations);
        }
        catch (error) {
            console.error('Controller: getReservationsByBienId: Error::', error.message)
            res.status(400).json({message: error.message});
        }
    }

    async newLocation(req, res) {
        try {
            console.info('Controller: newLocation', req.body.location);
            const location = req.body.location;
            const createdLocation = await locationsService.newLocation(location);
            res.status(201).json(createdLocation);
        } catch (error) {
            console.error('Controller: newLocation: Error::', error.message)
            res.status(400).json({message: error.message});
        }
    }

    async getLocationsByUserEmail(req, res) {
        console.info('Controller: getLocationsByUserEmail', req.params.email);
        const userEmail = req.params.email;
        return await locationsService.getLocationsByUserEmail(userEmail);
    }

    async addReviewToLocation(req, res) {
        const locationId = req.params.id;
        const review = req.body.review;
        return await locationsService.addReviewToLocation(locationId, review);
    }
}
module.exports = new LocationsController();