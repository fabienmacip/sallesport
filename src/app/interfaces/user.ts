export interface User {

  id: number;
  role: string; // admin ou partenaire
  name: string; // Nom de l'admin ou NOM de FRANCHISE (si role == partenaire)
  email?: string;
}
