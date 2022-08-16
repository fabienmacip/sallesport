import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { Commentaire } from 'src/app/interfaces/commentaire';
import { Recette } from 'src/app/interfaces/recette';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.component.html',
  styleUrls: ['./single-recette.component.css'],
})
export class SingleRecetteComponent implements OnInit, OnDestroy {

  currentRecette!: Recette;

  commentaireForm! : FormGroup;
  commentaires: Commentaire[] = [];
  currentCommentaire: any;
  subscription!: Subscription;

  constructor(
    private recettesService: RecettesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentairesService: CommentairesService,

  ) { }

  ngOnInit(): void {
    const recetteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.recettesService.getRecetteById(<string>recetteId)
    .then(recette => {
      this.currentRecette = {id: <string>recetteId, ...recette };
    })
    .catch(console.error);

    this.subscription = this.commentairesService.commentairesSubject.subscribe({
      next: (commentaires: Commentaire[]) => {
        this.commentaires = commentaires;
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.commentairesService.getCommentaires(<string>recetteId);

    this.initCommentaireForm(<string>recetteId, 'inconnu');

  }

  initCommentaireForm(idRecett: string = '', prenom: string = ''): void {

    this.commentaireForm = this.formBuilder.group({
      id: '',
      idRecette: idRecett ?? '',
      prenom: prenom ?? '',
      description: ['',[Validators.minLength(2), Validators.required]],
      note : [0, [Validators.max(5), Validators.min(0), Validators.maxLength(1)]]
    })
  }

  onSubmitCommentaireForm(): void {
    const commentaireId = this.commentaireForm.value.id;
    let commentaire = this.commentaireForm.value;
    if(!commentaireId || commentaireId && commentaireId === ''){
      // CREATE
      delete commentaire.id;
      this.commentairesService.createCommentaire(commentaire).catch(console.error);
    } else {
      // UPDATE
      console.log("update commentaire");
      /* delete recette.id;
      this.recettesService.editRecette(recette, recetteId, this.currentRecettePhotoFile).catch(console.error); */
    }

    this.initCommentaireForm(commentaire.idRecette, commentaire.prenom);

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
