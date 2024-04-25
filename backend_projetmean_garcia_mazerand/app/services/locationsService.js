const locationsRepository = require('../repositories/locationsRepository');
const biensRepository = require('../repositories/biensRepository');
const faker = require('faker');
const mailConfig = require('../../config/mailConfig');
const commentPieces = require('../../config/commentsConfig');

class LocationsService {

    constructor() {
    }

    async getLocations() {
        return await locationsRepository.getLocations();
    }

    async getLocationByBienId(bienId) {
        return await locationsRepository.getLocationByBienId(bienId);
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

    // Création fausse location
    async createFakeReservations() {
        const biens = await biensRepository.getBiens();
        const fakeReservations = {};

        for (const bien of biens) {
            const numReservations = Math.floor(Math.random() * 5) + 1;
            fakeReservations[bien.idBien] = [];

            for (let i = 0; i < numReservations; i++) {
                const mailLoueur = mailConfig.mail[Math.floor(Math.random() * mailConfig.mail.length)];
                const note = (Math.floor(Math.random() * 10) + 1) / 2;
                const commentaire = this.generateFakeComment(bien, note);

                const fakeReservation = {
                    idBien: bien.idBien,
                    mailLoueur,
                    dateDebut: faker.date.past().getTime(),
                    dateFin: faker.date.recent().getTime(),
                    avis: {
                        note,
                        commentaire
                    }
                };

                const createdReservation = await this.createLocation(fakeReservation);
                console.log('Created fake reservation:', createdReservation);
                fakeReservations[bien.idBien].push(commentaire);
            }
        }

        return fakeReservations;
    }

    async showFakeReservations() {
        // Recupere une bien aleatoire et afficher une fakeComment pour ce bien
        const biens = await biensRepository.getBiens();

        // Recupere une bien aletaoire
        const bien = biens[Math.floor(Math.random() * biens.length)];
        const randomNote = (Math.floor(Math.random() * 10) + 1) / 2;
        return this.generateFakeComment(bien, randomNote);
    }

    generateFakeComment(bien, note) {
        let comment = '';

        // Ajout de pièces génériques en fonction du type de logement
        if (bien.typeLogement in commentPieces) {
            comment += this.getRandomFromArray(commentPieces[bien.typeLogement][this.getCommentType(note)]) + ' ';
        }

        // Ajout de pièces spécifiques en fonction de la commune
        if (bien.commune in commentPieces.ville) {
            comment += this.getRandomFromArray(commentPieces.ville[bien.commune][this.getCommentType(note)]) + ' ';
        }

        // Ajout de commentaires en fonction de la surface
        if (bien.surface <= 20) {
            comment += this.getRandomFromArray(commentPieces.surface.small[this.getCommentType(note)]) + ' ';
        } else if (bien.surface <= 50) {
            comment += this.getRandomFromArray(commentPieces.surface.medium[this.getCommentType(note)]) + ' ';
        } else {
            comment += this.getRandomFromArray(commentPieces.surface.large[this.getCommentType(note)]) + ' ';
        }

        // Ajout de commentaires en fonction de la distance
        if (bien.distance <= 200) {
            comment += this.getRandomFromArray(commentPieces.distance.close[this.getCommentType(note)]) + ' ';
        } else if (bien.distance <= 5000) {
            comment += this.getRandomFromArray(commentPieces.distance.medium[this.getCommentType(note)]) + ' ';
        } else {
            comment += this.getRandomFromArray(commentPieces.distance.far[this.getCommentType(note)]) + ' ';
        }

        // Ajout de commentaires en fonction du prix
        if (bien.prix <= 50) {
            comment += this.getRandomFromArray(commentPieces.prix.low[this.getCommentType(note)]) + ' ';
        } else if (bien.prix <= 150) {
            comment += this.getRandomFromArray(commentPieces.prix.medium[this.getCommentType(note)]) + ' ';
        } else {
            comment += this.getRandomFromArray(commentPieces.prix.high[this.getCommentType(note)]) + ' ';
        }

        // Ajout de pièces spécifiques en fonction de la surface, du prix, de la distance, du nombre de chambres et du nombre de couchages
        comment += this.getRandomFromArray(commentPieces.nbChambres[this.getCommentType(note)]) + ' ';
        comment += this.getRandomFromArray(commentPieces.nbCouchages[this.getCommentType(note)]) + ' ';

        return comment.trim();
    }

    getRandomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    getCommentType(note) {
        if (note < 2) {
            return 'bad';
        } else if (note <= 3.5) {
            return 'average';
        } else {
            return 'good';
        }
    }
}

module.exports = new LocationsService();