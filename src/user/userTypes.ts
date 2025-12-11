export interface UserFormatedType {
  id: number;
  name: string;
  email: string;
  profilePic: string | null;
  phoneNumber: string;
  document: string;
  zipCode: string | null;
  street: string | null;
  numberAddress: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  complement: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface UpdateUserType {
  name: string;
  profilePic: string | null;
  numberAddress: string;
  phoneNumber: string;
  document: string;
  zipCode: string;
}
