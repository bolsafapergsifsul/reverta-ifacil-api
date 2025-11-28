export interface EcoPointType {
  id: number;
  name: string;
  serviceHours: string | null;
  phoneNumber: string | null;
  infos: string | null;
  images: string[];
  zipCode: string | null; // obrigatório (igual ao DTO)
  street: string | null;
  numberAddress: string | null; // obrigatório (igual ao DTO)
  complement?: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  materialsCollected?: {
    id: number;
    name: string;
  }[];
}

export interface EcoPointTypeFormatted {
  id: number;
  name: string;
  zipCode: string | null;
  street: string | null;
  numberAddress: string | null; // obrigatório
  complement?: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  serviceHours: string | null;
  phoneNumber: string | null;
}
