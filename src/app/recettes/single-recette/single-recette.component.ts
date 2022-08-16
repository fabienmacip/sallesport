import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recette } from 'src/app/interfaces/recette';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.component.html',
  styleUrls: ['./single-recette.component.css'],
})
export class SingleRecetteComponent implements OnInit {

  currentRecette!: Recette;

  constructor(
    private recettesService: RecettesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const recetteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.recettesService.getRecetteById(<string>recetteId)
    .then(recette => {
      this.currentRecette = recette;
    })
    .catch(console.error);
  }

}
