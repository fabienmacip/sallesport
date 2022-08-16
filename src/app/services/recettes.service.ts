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
  ) {}

  private recettes: Recette[] = [];

  recettesSubject: BehaviorSubject<Recette[]> = new BehaviorSubject(<Recette[]>[]);

  getRecettes(): void{
    this.db.list('recettes').query.limitToLast(20).once('value', snapshot => {
      const recettesSnapshotValue = snapshot.val();
      if(recettesSnapshotValue){
        const recettes = Object.keys(recettesSnapshotValue).map(id => ({id, ...recettesSnapshotValue[id]}));
        this.recettes = recettes;
      }
      this.dispatchRecettes();
    })
  }

  getRecettesPatient(allergenCacahuete: boolean = false, allergenCacao: boolean = false,
    allergenGluten: boolean = false, allergenLait: boolean = false,
    dietNormal: boolean = false, dietDiabete: boolean = false,
    dietPaleo: boolean = false, dietProteine: boolean = false,
    dietVegan: boolean = false, dietVegetarien: boolean = false): void{
    this.db.list('recettes').query.limitToLast(20).once('value', snapshot => {
      const recettesSnapshotValue = snapshot.val();
      if(recettesSnapshotValue){
        let recettes = Object.keys(recettesSnapshotValue).map(id => ({id, ...recettesSnapshotValue[id]}));
        recettes = allergenCacahuete ? recettes.filter(e => !e.allergenCacahuete) : recettes;
        recettes = allergenCacao ? recettes.filter(e => !e.allergenCacao) : recettes;
        recettes = allergenGluten ? recettes.filter(e => !e.allergenGluten) : recettes;
        recettes = allergenLait ? recettes.filter(e => !e.allergenLait) : recettes;
        recettes = recettes.filter(e => e.dietNormal && dietNormal ||
                                        e.dietDiabete && dietDiabete ||
                                        e.dietPaleo && dietPaleo ||
                                        e.dietProteine && dietProteine ||
                                        e.dietVegan && dietVegan ||
                                        e.dietVegetarien && dietVegetarien);
        this.recettes = recettes;
      }
      this.dispatchRecettes();
    })
  }

  getRecetteById(recetteId: string): Promise<Recette> {
    return new Promise((resolve, reject) => {
      this.db.database.ref(`recettes/${recetteId}`).once('value', (snapshot, err) => {
        if(err) {
          reject(err);
        }
        resolve(snapshot.val());
      });
    });
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

  async editRecette(recette: Recette, recetteId: string, newRecettePhoto?: any): Promise<Recette>{
    try {
      if(newRecettePhoto && recette.photo && recette.photo !== ''){
        await this.removePhoto(recette.photo);
      }
      if(newRecettePhoto){
        const newPhotoUrl = await this.uploadPhoto(newRecettePhoto);
        recette.photo = newPhotoUrl;
      }
      await this.db.list('recettes').update(recetteId, recette)
      const recetteIndexToUpdate = this.recettes.findIndex(el => el.id === recetteId);
      this.recettes[recetteIndexToUpdate] = {...recette, id: recetteId};
      this.dispatchRecettes();
      return {...recette, id: recetteId};
    } catch(error) {
      throw error;
    }
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
