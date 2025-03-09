export interface Ubicacion {
    _id: string;
    nombre: string;
    ubicacion: {
      latitud: number;
      longitud: number;
    };
    categoria: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }