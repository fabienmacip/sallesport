import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Recette } from 'src/app/interfaces/recette';
import { RecettesService } from 'src/app/services/recettes.service';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit, OnDestroy {

  recetteForm!: FormGroup;

  recettes: Recette[] = [];

  currentRecette: any;

  subscription! : Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private recettesService: RecettesService
  ) { }

  ngOnInit(): void {
    this.initRecetteForm();

    this.subscription = this.recettesService.recettesSubject.subscribe({
      next: (recettes: Recette[]) => {
        console.log('NEXT recette');
        this.recettes = recettes;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.recettesService.getRecettes();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initRecetteForm(): void{
    this.recetteForm = this.formBuilder.group({
      id: [null],
      title: ['Purée de pois-chiches', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      description: ['lorem ipsum dolor...',[Validators.required, Validators.maxLength(200)]],
      preparationTime: [25,[Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      breakTime: [30,[Validators.maxLength(3)]],
      cookingTime: [5,[Validators.maxLength(3)]],
      ingredients: ['200 g de pois-chiches, 3 cuillères d\'huile, 1 pincée de sel',[Validators.maxLength(300)]],
      steps: ['1. Hacher les pois-chiches // 2. Ajouter l\'huile et le sel // 3. Mélanger',[Validators.maxLength(300)]],
      allergens: ['aucun',[Validators.maxLength(150)]],
      diets: ['vegan, végétarien, végétalien, protéiné', [Validators.maxLength(150)]]
    })
  }

  onEditRecette(recette: Recette): void{
    this.recetteForm.setValue({
      id: recette.id ?? '',
      title : recette.title ?? '',
      description: recette.description ?? '',
      preparationTime: recette.preparationTime ?? 0,
      breakTime : recette.breakTime ?? 0,
      cookingTime: recette.cookingTime ?? 0,
      ingredients: recette.ingredients ?? '',
      steps : recette.steps ?? '',
      allergens: recette.allergens ?? '',
      diets : recette.diets ?? ''
    });
  }

  onSubmitRecetteForm(): void{
    const recetteId = this.recetteForm.value.id;
    let recette = this.recetteForm.value;
    if(!recetteId || recetteId && recetteId === ''){
      // CREATION
      delete recette.id;
      this.recettesService.createRecette(recette).catch(console.error);
    } else {
      // MODIFICATION
      delete recette.id;
      this.recettesService.editRecette(recette, recetteId).catch(console.error);
    }
    this.recetteForm.reset();
  }

  onDeleteRecette(recetteId?: string): void{
    if(recetteId){
      this.recettesService.deleteRecette(recetteId).catch(console.error);
    } else {
      console.error('Un id doit être fourni pour pouvoir supprimer cette recette.');
    }
  }


}
