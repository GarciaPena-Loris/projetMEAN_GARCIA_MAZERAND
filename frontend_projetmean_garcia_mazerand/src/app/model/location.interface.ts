// location.interface.ts
import {Avis} from "./avis.interface";

export interface Location {
  idBien: number;
  mailLoueur: string;
  dateDebut: number;
  dateFin: number;
  avis: Avis[];
}
