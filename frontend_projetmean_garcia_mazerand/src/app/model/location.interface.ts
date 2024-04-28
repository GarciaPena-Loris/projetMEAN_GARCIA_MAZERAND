// location.interface.ts
import {Avis} from "./avis.interface";

export interface Location {
  idLocation: number;
  idBien: number;
  mailLoueur: string;
  dateDebut: number;
  dateFin: number;
  avis: Avis[];
}
