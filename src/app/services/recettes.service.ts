import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recette } from '../interfaces/recette';

@Injectable({
  providedIn: 'root'
})

export class RecettesService {

  constructor() { }

  private recettes: Recette[] = [
    {
      title: 'Pain au chocolat',
      description: 'Viennoiserie fourrée au chocolat',
      preparationTime: 20,
      breakTime: 30,
      cookingTime: 10,
      ingredients : 'farine, eau, levure de boulanger, sucre, chocolat',
      steps: '1. mélanger le tout. // 2. faire cuire // 3. ajouter les barres de chocolat dès la fin de la cuisson',
      allergens: 'gluten, cacao, levure',
      diets : 'végétarien, végétalien, vegan, sans lactose'
    },
    {
      title: 'Coleslaw',
      description: 'Chou et carottes râpés',
      preparationTime: 15,
      breakTime: 0,
      cookingTime: 0,
      ingredients : 'chou, carottes, huile, vinaigre',
      steps: '1. Râper les légumes. // 2. Incorporer huile et vinaigre // 3. Mélanger',
      allergens: '',
      diets : 'végétarien, végétalien, vegan, sans lactose'
    }
  ]

  recettesSubject: BehaviorSubject<Recette[]> = new BehaviorSubject(<Recette[]>[]);

  getRecettes(){

  }

  dispatchRecettes() {
    this.recettesSubject.next(this.recettes);
  }

  createRecette(recette: Recette): Recette[]{
    this.recettes.push(recette);
    return this.recettes;
  }

  editRecette(recette: Recette, index: number): Recette[]{
    return this.recettes;
  }

  deleteRecette(recetteIndex: number): Recette[]{
    this.recettes.splice(recetteIndex, 1);
    return this.recettes;
  }
}
