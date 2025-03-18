
export interface Event {
  _id?: string; // Opcional porque MongoDB genera esto automáticamente
  title: string;
  start: Date;
  description?: string; // Opcional
  location?: string; // Puede ser un objeto Ubicacion o solo el ID como string
  category: ('clase' | 'ruta' | 'reunion' | 'evento')[];
  level?: ('Iniciación' | 'Intermedio' | 'Avanzado')[]; // Opcional
  createdAt?: Date;
  updatedAt?: Date;
}