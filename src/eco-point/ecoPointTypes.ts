export interface EcoPointType {
  id: number;
  name: string;
  zipCode: string;
  street: string;
  numberAddress: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  serviceHours: string;
  phone: string;
  collectionsInfo: string;
  typeMaterials: string;
}

export interface EcoPointTypeFormatted {
  id: number;
  name: string;
  zipCode: string;
  street: string;
  numberAddress: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  serviceHours: string;
  phone: string;
}
