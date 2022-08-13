import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PhoneMultiFactorGenerator } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Recette } from '../interfaces/recette';

@Injectable({
  providedIn: 'root'
})

export class RecettesService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    //this.getRecettes();
  }

  private recettes: Recette[] = [
/*     {
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
 */  ]

  recettesSubject: BehaviorSubject<Recette[]> = new BehaviorSubject(<Recette[]>[]);

  getRecettes(): void{
    this.db.list('recettes').query.limitToLast(10).once('value', snapshot => {
      const recettesSnapshotValue = snapshot.val();
      if(recettesSnapshotValue){
        const recettes = Object.keys(recettesSnapshotValue).map(id => ({id, ...recettesSnapshotValue[id]}));
        this.recettes = recettes;
      }
      this.dispatchRecettes();
    })
  }

  dispatchRecettes() {
    this.recettesSubject.next(this.recettes);
  }

/*// VERSION sans upload de photo
  createRecette(recette: Recette): Promise<Recette>{
    return new Promise((resolve,reject) => {
      this.db.list('recettes').push(recette)
      .then(res => {
        const createdRecette = {...recette, id: <string>res.key};
        this.recettes.push(createdRecette);
        this.dispatchRecettes();
        resolve(createdRecette);
      }).catch(reject);
    });
  } */

  async createRecette(recette: Recette, recettePhoto?: any): Promise<Recette>{
    try {
       const photoUrl = recettePhoto ? await this.uploadPhoto(recettePhoto) : '';
       const response = this.db.list('recettes').push({...recette, photo: photoUrl});
       const createdRecette = {...recette, photo: photoUrl, id: <string>response.key};
       this.recettes.push(createdRecette);
       this.dispatchRecettes();
       return createdRecette;
    } catch(error) {
      throw error;
    }
  }

  editRecette(recette: Recette, recetteId: string): Promise<Recette>{
    return new Promise((resolve, reject) => {
      this.db.list('recettes').update(recetteId, recette)
      .then(() => {
        const updatedRecette = {...recette, id: recetteId};
        const recetteToUpdateIndex = this.recettes.findIndex(el => el.id === recetteId);
        this.recettes[recetteToUpdateIndex] = updatedRecette;
        this.dispatchRecettes();
        resolve({...recette, id: recetteId});
      }).catch(reject);
    })
  }

  async deleteRecette(recetteId: string): Promise<Recette>{
    try {
      const recetteToDeleteIndex = this.recettes.findIndex(el => el.id === recetteId);
      const recetteToDelete = this.recettes[recetteToDeleteIndex];
      if(recetteToDelete.photo && recetteToDelete.photo !== ''){
          await this.removePhoto(recetteToDelete.photo);
      }
      await this.db.list('recettes').remove(recetteId);
      this.recettes.splice(recetteToDeleteIndex, 1);
      this.dispatchRecettes();
      return recetteToDelete;
    } catch(error) {
      throw error;
    }
  }

  private uploadPhoto(photo: any): Promise<string>{
    return new Promise((resolve, reject) => {
      const upload = this.storage.upload('recettes/' + Date.now().toString() + '-' + photo.name, photo);
      upload.then((res) => {
        //console.info(res.ref.getDownloadURL());
        resolve(res.ref.getDownloadURL());
      }).catch(reject);
    })
  }

  private removePhoto(photoUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.refFromURL(photoUrl).delete().subscribe({
        complete: () => resolve({}),
        error: reject
      })
    })
  }

}
