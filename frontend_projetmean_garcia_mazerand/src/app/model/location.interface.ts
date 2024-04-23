// location.interface.ts
import {Avis} from "./avis.interface";

export interface Location {
  idLocation: string;
  idBien: number;
  mailLoueur: string;
  dateDebut: number;
  dateFin: number;
  avis: Avis;
}
