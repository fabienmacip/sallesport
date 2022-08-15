export interface Patient {
  id?: string;
  lastName: string;
  firstName: string;
  email?: string;
  password?: string;
  dob: string;
  sex: string;
  height?: number;
  weight?: number;
  diet?: string;
  allergenCacao? : string;
  allergenLait? : string;
  allergenCacahuete? : string;
  allergenGluten? : string;
}
