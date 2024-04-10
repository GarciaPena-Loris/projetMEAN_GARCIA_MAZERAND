const biensRepository = require('../repositories/biensRepository');
const imagesConfig = require('../../config/imagesConfig');
const mailConfig = require('../../config/mailConfig');
const {fakerFR: faker} = require('@faker-js/faker');

class BiensService {

    constructor() {
    }

    async getBiens() {
        return await biensRepository.getBiens();
    }

    async getLastBienId() {
        return await biensRepository.getLastBienId();
    }

    async createBien(bien) {
        return await biensRepository.createBien(bien);
    }

    async updateBien(bien) {
        return await biensRepository.updateBien(bien);
    }

    async deleteBien(bienId) {
        return await biensRepository.deleteBien(bienId);
    }

    async createMultipleBiensAleatoire(nombreBiens) {
        let mailProprio;
        let listeBiens = [];
        for (let i = 0; i < nombreBiens; i++) {
            mailProprio = this.getRandomFromArray(mailConfig.mail);
            listeBiens.push(await this.createBienAleatoire(mailProprio));
        }
        return listeBiens;
    }

    async createBienAleatoire(mailProprio) {
        const adresse = this.generateAdresses();
        const typeLogement = this.getRandomTypeLogement();
        const nombreDeChambres = this.getRandomNbChambres(typeLogement);
        const nombreDeCouchages = this.getRandomNbCouchages(typeLogement, nombreDeChambres);
        const surface = this.getRandomSurface(typeLogement);
        const images = this.getRandomImages(typeLogement);
        const prix = this.getRandomPrix(nombreDeChambres, nombreDeCouchages, surface, typeLogement, adresse.distance, adresse.commune);
        const bien = {
            idBien: await this.getNextIdBien(),
            mailProprio: mailProprio,
            commune: adresse.commune,
            rue: adresse.rue,
            cp: adresse.cp,
            latitude: adresse.latitude,
            longitude: adresse.longitude,
            nbCouchages: nombreDeCouchages,
            nbChambres: nombreDeChambres,
            distance: adresse.distance,
            prix: prix,
            surface: surface,
            typeLogement: typeLogement,
            description: this.getRandomDescription(nombreDeChambres, nombreDeCouchages, typeLogement, adresse.distance, adresse.commune, prix),
            imagePrincipale: images.imagePrincipale,
            images: images.images
        };
        return await biensRepository.createBien(bien);
    }

    async getNextIdBien() {
        const lastBienId = await biensRepository.getLastBienId();
        console.info('Dernier bien récupéré: ' + lastBienId);
        return lastBienId ? lastBienId + 1 : 1;
    }

    getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getRandomNbChambres(typeLogement) {
        let minChambres, maxChambres;
        switch (typeLogement) {
            case "appartement":
                minChambres = 1;
                maxChambres = 3;
                break;
            case "maison":
                minChambres = 2;
                maxChambres = 6;
                break;
            case "studio":
                minChambres = 1;
                maxChambres = 1;
                break;
            default:
                minChambres = 1;
                maxChambres = 4;
                break;
        }
        // Génère un nombre de chambres aléatoire en fonction du type de logement
        return Math.floor(Math.random() * (maxChambres - minChambres + 1)) + minChambres;
    }

    getRandomNbCouchages(typeLogement, nombreDeChambres) {
        let minCouchages, maxCouchages;
        switch (typeLogement) {
            case "appartement":
                minCouchages = nombreDeChambres + 1;
                maxCouchages = nombreDeChambres * 2 + 1;
                break;
            case "maison":
                minCouchages = nombreDeChambres * 2;
                maxCouchages = nombreDeChambres * 3;
                break;
            case "studio":
                minCouchages = 1;
                maxCouchages = 2;
                break;
            default:
                minCouchages = 1;
                maxCouchages = 4;
                break;
        }
        // Génère un nombre de couchages aléatoire en fonction du type de logement et du nombre de chambres
        return Math.floor(Math.random() * (maxCouchages - minCouchages + 1)) + minCouchages;
    }

    getRandomTypeLogement() {
        // Retourne un type de logement aléatoire parmi les trois types suivants
        const typesLogement = ["appartement", "maison", "studio"];
        return this.getRandomFromArray(typesLogement);
    }

    generateAdresses() {
        const commune = faker.location.city();
        const rue = faker.location.streetAddress(true);
        const cp = faker.location.zipCode();
        const distance = Math.floor(Math.random() * 5000) + 50; // Distance aléatoire entre 50 et 1050 mètres
        const latitude = faker.location.latitude({max: 49.2987535378984, min: 43.37560894095645, precision: 16});
        const longitude = faker.location.longitude({max: 6.079860323227755, min: -1.14387274200352, precision: 16});
        return {commune, rue, cp, distance, latitude, longitude};
    }

    getRandomSurface(typeLogement) {
        let minSurface, maxSurface;
        switch (typeLogement) {
            case "appartement":
                minSurface = 20;
                maxSurface = 100;
                break;
            case "maison":
                minSurface = 50;
                maxSurface = 500;
                break;
            case "studio":
                minSurface = 15;
                maxSurface = 50;
                break;
            default:
                minSurface = 20;
                maxSurface = 200;
                break;
        }
        // Génère une surface aléatoire en fonction du type de logement
        return Math.floor(Math.random() * (maxSurface - minSurface + 1)) + minSurface;
    }

    getRandomDescription(nombreDeChambres, nombreDeCouchages, typeLogement, distance, ville, prix) {
        // Phrases préfabriquées pour la description
        const phrasesPrefabriquees = {
            "appartement": ["Bel appartement", "Joli appartement", "Charmant appartement", "Appartement spacieux", "Appartement moderne", "Appartement confortable"],
            "maison": ["Belle maison", "Agréable maison", "Charmante maison", "Maison spacieuse", "Maison moderne", "Maison confortable"],
            "studio": ["Joli studio", "Charmant studio", "Agréable studio", "Studio spacieux", "Studio moderne", "Studio confortable"],
            "descriptionGenerale": ["situé à {ville}, à proximité du centre ville ({distance} mètres)", "situé à {distance} mètres du centre-ville de {ville}", "à seulement {distance} mètres de {ville}", "à une distance de {distance} mètres de {ville}"],
            "phrasesSupplementaires": [
                "Très lumineux",
                "Situé dans un endroit tranquille",
                "Vue imprenable",
                "Décoré avec goût",
                "Proche des transports en commun",
                "Idéal pour les familles",
                "Parfait pour un séjour de détente",
                "Offre une vue panoramique",
                "Situé dans un quartier animé",
                "Proche de toutes commodités",
                "À quelques pas des restaurants et des boutiques",
                "Entièrement équipé pour un séjour confortable",
                "Dispose d'un jardin privé pour se détendre",
                "Offre un accès facile aux principaux sites touristiques",
                "Ambiance chaleureuse et accueillante",
                "À proximité de sentiers de randonnée et de pistes cyclables",
                "Propose une cuisine entièrement équipée pour préparer vos repas",
                "À quelques minutes des attractions touristiques populaires",
                "Dispose d'une connexion Wi-Fi haut débit",
                "Permet de profiter d'une vue magnifique depuis le balcon",
                "Inclut un parking gratuit pour plus de commodité",
                "Idéal pour les voyageurs d'affaires",
                "Situé dans un quartier historique",
            ]
        };

        // Sélection aléatoire d'une phrase préfabriquée en fonction du type de logement
        const phraseTypeLogement = phrasesPrefabriquees[typeLogement][Math.floor(Math.random() * phrasesPrefabriquees[typeLogement].length)];

        // Sélection aléatoire d'une phrase préfabriquée pour la description générale
        const phraseDescriptionGenerale = phrasesPrefabriquees["descriptionGenerale"][Math.floor(Math.random() * phrasesPrefabriquees["descriptionGenerale"].length)];

        // Remplacer les variables dans la phrase de description générale
        const descriptionGenerale = phraseDescriptionGenerale.replace("{ville}", ville).replace("{distance}", distance);

        // Sélection aléatoire de quelques phrases supplémentaires
        const phrasesSupplementaires = [];
        for (let i = 0; i < 2; i++) { // Choisissez 2 phrases supplémentaires au hasard
            const phrase = phrasesPrefabriquees["phrasesSupplementaires"][Math.floor(Math.random() * phrasesPrefabriquees["phrasesSupplementaires"].length)];
            phrasesSupplementaires.push(phrase);
        }

        // Générer la description complète en combinant les phrases
        return `${phraseTypeLogement} ${descriptionGenerale}. ${phrasesPrefabriquees["phrasesSupplementaires"][Math.floor(Math.random() * phrasesPrefabriquees["phrasesSupplementaires"].length)]}. Ce logement dispose de ${nombreDeChambres} chambre${nombreDeChambres > 1 ? 's' : ''} et peut accueillir jusqu'à ${nombreDeCouchages} personne${nombreDeCouchages > 1 ? 's' : ''}. Le prix par nuit est de ${prix}€. ${phrasesSupplementaires.join(", ")}.`;
    }

    getRandomImages(typeLogement) {
        let imagePrincipale, images = [], nombreImages;
        switch (typeLogement) {
            case "appartement":
                imagePrincipale = this.getRandomFromArray(imagesConfig.devantureAppartement);
                nombreImages = Math.floor(Math.random() * 6) + 1; // Entre 1 et 6 images
                for (let i = 0; i < nombreImages; i++) {
                    images.push(this.getRandomFromArray(imagesConfig.appartement));
                }
                break;
            case "maison":
                imagePrincipale = this.getRandomFromArray(imagesConfig.devantureMaison);
                nombreImages = Math.floor(Math.random() * 6) + 3;
                for (let i = 0; i < nombreImages; i++) {
                    images.push(this.getRandomFromArray(imagesConfig.maison));
                }
                break;
            case "studio":
                imagePrincipale = this.getRandomFromArray(imagesConfig.devantureAppartement);
                nombreImages = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < nombreImages; i++) {
                    images.push(this.getRandomFromArray(imagesConfig.appartement));
                }
                break;
            default:
                imagePrincipale = this.getRandomFromArray(imagesConfig.devantureAppartement);
                nombreImages = Math.floor(Math.random() * 6) + 1;
                for (let i = 0; i < nombreImages; i++) {
                    images.push(this.getRandomFromArray(imagesConfig.appartement));
                }
                break;
        }
        return {imagePrincipale, images};

    }

    getRandomPrix(nombreDeChambres, nombreDeCouchages, surface, typeLogement, distance, ville) {
        // Coefficients pour ajuster le prix en fonction des différents facteurs
        const coefficientChambres = 5;
        const coefficientCouchages = 3;
        const coefficientSurface = 0.2;

        const coefficientTypeLogement = {
            "appartement": 1.2,
            "maison": 1.8,
            "studio": 0.8
        };
        const coefficientDistance = 0.005; // Prix augmenté de 0.001€ par mètre de distance
        const coefficientVille = {
            "Paris": 2.5,
            "Marseille": 1.6,
            "Lyon": 1.5,
            "Toulouse": 1.4,
            "Nice": 1.3,
            "Nantes": 1.3,
            "Montpellier": 1.2,
            "Strasbourg": 1.2,
            "Bordeaux": 1.4,
            "Lille": 1.1,
        };

        // Calcul du prix de base en fonction du nombre de chambres et de couchages
        let prixBase = (nombreDeChambres * coefficientChambres) + (nombreDeCouchages * coefficientCouchages) + (surface * coefficientSurface);

        // Ajustement du prix en fonction du type de logement
        if (coefficientTypeLogement[typeLogement]) {
            prixBase *= coefficientTypeLogement[typeLogement];
        }

        // Ajustement du prix en fonction de la distance
        prixBase += distance * coefficientDistance;

        // Ajustement du prix en fonction de la ville
        let coefficientVilleSpecifique = coefficientVille[ville];
        if (!coefficientVilleSpecifique) {
            coefficientVilleSpecifique = 1.0; // Si la ville n'est pas spécifiée ou n'est pas dans la liste, pas d'ajustement de prix
        }
        prixBase *= coefficientVilleSpecifique;

        // Générer un prix aléatoire dans une certaine fourchette autour du prix de base
        const prixMin = prixBase * 0.8; // 80% du prix de base
        const prixMax = prixBase * 1.2; // 120% du prix de base
        if (typeLogement === "maison" && surface > 200) {
            // Si c'est une grande maison, augmenter le prix de 40%
            return parseFloat((prixBase * 1.4).toFixed(1));
        }
        const prixAleatoire = Math.random() * (prixMax - prixMin) + prixMin;

        return parseFloat(prixAleatoire.toFixed(1)); // Arrondir à une décimale et retourner le prix
    }

}

module.exports = new BiensService();