export interface Recette {
  id?: string;
  title: string;
  photo?: string;
  description?: string;
  preparationTime?: number;
  breakTime?: number;
  cookingTime?: number;
  ingredients? : string;
  steps?: string;
  allergenCacao? : string;
  allergenLait? : string;
  allergenCacahuete? : string;
  allergenGluten? : string;
  dietNormal? : boolean;
  dietVegan? : boolean;
  dietVegetarien? : boolean;
  dietPaleo? : boolean;
  dietDiabete? : boolean;
  dietProteine? : boolean;
  patientsOnlyCheck?: boolean;
}



