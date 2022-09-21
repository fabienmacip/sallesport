export interface CurrentUser {
  id: number;
  role: string; // admin ou partenaire
  token: string; // Nom de l'admin ou NOM de FRANCHISE (si role == partenaire)
}
