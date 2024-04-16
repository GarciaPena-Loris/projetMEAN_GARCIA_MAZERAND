// bien.interface.ts
export interface Bien {
  idBien: number;
  mailProprio: string;
  commune: string;
  rue: string;
  cp: string;
  latitude: number;
  longitude: number;
  nbCouchages: number;
  nbChambres: number;
  distance: number;
  prix: number;
  surface: number;
  typeLogement: string;
  description: string;
  imagePrincipale: string;
  images: string[];
}
