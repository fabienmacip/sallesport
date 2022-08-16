import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject } from 'rxjs';
import { Commentaire } from '../interfaces/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  private commentaires: Commentaire[] = [];
  commentairesSubject: BehaviorSubject<Commentaire[]> = new BehaviorSubject(<Commentaire[]>[]);

  getCommentaires(): void{
    this.db.list('commentaires').query.limitToLast(20).once('value', snapshot => {
      const commentsSnapshotValue = snapshot.val();
      if(commentsSnapshotValue){
        const comments = Object.keys(commentsSnapshotValue).map(id => ({id, ...commentsSnapshotValue[id]}));
        this.commentaires = comments;
      }
      this.dispatchCommentaires();
    })
  }

  dispatchCommentaires() {
    this.commentairesSubject.next(this.commentaires);
  }

  async createCommentaire(commentaire: Commentaire): Promise<Commentaire>{
    try {
       const response = this.db.list('commentaires').push(commentaire);
       const createdCommentaire = {...commentaire, id: <string>response.key};
       this.commentaires.push(createdCommentaire);
       this.dispatchCommentaires();
       return createdCommentaire;
    } catch(error) {
      throw error;
    }
  }

}






/*
id?: string;
idRecette?: string;
prenom?: string;
description?: string;
note? : number;

 */
