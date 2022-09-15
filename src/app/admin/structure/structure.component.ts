import { Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Structure } from 'src/app/interfaces/structure';
import { Mail } from 'src/app/interfaces/mail';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit, OnDestroy {

  linkToHereParams: any;
  partenaireId!: number;
  partenaireNomFranchise!: string;

  structureForm!: FormGroup;

  structures: Structure[] = [];
  structuresToDisplay: Structure[] = [];

  currentStructure: any;

  subscription! : Subscription;

  titrePage: string = 'Enregistrer une nouvelle structure';
  sousTitrePage: string = 'Toutes les structures';

  grantsFormToggle: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.partenaireId = Number(this.activatedRoute.snapshot.paramMap.get('partenaireId'));
    this.partenaireNomFranchise = <string>this.activatedRoute.snapshot.paramMap.get('partenaireNomFranchise');

    this.initStructureForm();

    if(this.partenaireId !== 0) {
      this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
        this.structures = structures;
        this.structuresToDisplay = structures;
        this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
      })
    } else {
      this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
        this.structures = structures;
        this.structuresToDisplay = structures;
      })
    }



  }


  initStructureForm(): void{
    this.structureForm = this.formBuilder.group({
      id: [0],
      adr1: ['2ème étage', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      adr2: ['3, rue des prés', [Validators.minLength(2), Validators.maxLength(45)]],
      cp: ['75003', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
      ville: ['PARIS', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      sexegerant: ['F', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      nomgerant: ['Gineste', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      mail: ['gigi@yahoo.fr', [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: ['mlkjmlkj', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
      actif: [true],
      grants: ['1'],
      partenaire: [this.partenaireId ?? 0, [Validators.required, Validators.min(1)]],
      passwordConfirm: ['mlkjmlkj', [Validators.required]]
    })
  }


  onEditStructure(structure: Structure): void{

    this.grantsFormToggle = 0;

    this.titrePage = 'Modifier une structure';

    this.structureForm.setValue({
      id: structure.id ?? '',
      adr1 : structure.adr1 ?? '',
      adr2 : structure.adr2 ?? '',
      cp : structure.cp ?? '',
      ville : structure.ville ?? '',
      sexegerant : structure.sexegerant ?? 'M',
      nomgerant: structure.nomgerant ?? '',
      mail: structure.mail,
      password: structure.password,
      passwordConfirm: structure.password,
      actif: structure.actif == 0 ? false : true,
      grants: structure.grants ?? 0,
      partenaire: structure.partenaire ?? null
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onToggleStructureActif(id: string, actif: number): void{

    const confirmMsg = actif == 1 ? "Confirmer la désactivation ?" : "Confirmer l'activation ?";

    if(confirm(confirmMsg)){
      actif = actif == 1 ? 0 : 1;

      this.structureForm.reset();
      this.structureForm.controls['partenaire'].setValue(this.partenaireId);

      this.apiService.updateStructureActif(id, actif).subscribe({
        next: data => {
          this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
            this.structures = structures;
            this.structuresToDisplay = structures;
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          });

        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
    }

  }

  sexeGerant(e: string) {
    return e.toLowerCase() == 'f' ? 'Mme' : 'M.';
  }

  onSubmitStructureForm(): void{

    const structureId = this.structureForm.value.id;

    let structure = this.structureForm.value;

    if(!structureId || structureId && structureId == 0){

      // CREATE ligne STRUCTURE
      structure.id = "";
      delete structure.passwordConfirm;

      this.apiService.createStructure(structure).subscribe({
        next: data => {

          this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
            this.structures = structures;
            this.structuresToDisplay = structures;
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          });

          let qui = "la structure gérée par " + this.sexeGerant(structure.sexegerant!) + " " +
                    structure.nomgerant + " située à l'adresse suivante\n" +
                    structure.adr1 + " " + structure.adr2 + " à " + structure.ville;

          let mail: Mail = {
            id: 0,
            titre: "Structure créée, à activer.",
            corps: "Cher partenaire, nous vous informons que " + qui + " a été créée. Pour l'activer, merci de cliquer sur le bouton ci-dessous.",
            lien: "cliquer ici pour activer",
            lu: 0,
            partenaire: structure.partenaire
          }

          this.apiService.createMail(mail).subscribe({
            next: data2 => {
            },
            error: error2 => {
              console.log('Erreur lors de création de mail', error2);
            }
          });

          // Rechargement des données
          /* this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
            this.structures = structures;
          }) */

        },
        error: error => {
          console.error('There was an error!', error);
        }
      });

    } else {

      delete structure.passwordConfirm;

      // UPDATE
      //delete structure.id;
      this.apiService.updateStructure(structureId, structure).subscribe({
        next: data => {
          //this.postId = data.id;
          //console.log(data);
/*           this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
            this.structures = structures;
          });
 */
          this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
            this.structures = structures;
            this.structuresToDisplay = structures;
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          });
        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    }

    this.structureForm.reset();
    this.structureForm.controls['partenaire'].setValue(this.partenaireId);
    this.titrePage = 'Enregistrer une nouvelle structure';


  }

  onDeleteStructure(structureId?: number): void{

    this.grantsFormToggle = 0;

    if(confirm("SUPPRIMER ?")){
      if(structureId && structureId != 0){
        this.apiService.deleteStructure(structureId).subscribe((part: Structure)=>{
          this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
            this.structures = structures;
            this.structuresToDisplay = structures;
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          });
        });
      } else {
        console.error('Un id doit être fourni pour pouvoir supprimer cette structure.');
      }

    }


  }

  onToggleGrantsForm(structureId: number = 0){

    if(this.grantsFormToggle == structureId){
      this.grantsFormToggle = 0;
    } else {
      this.grantsFormToggle = structureId;
    }

  }

  onChangeSeekStructure(event : any): void{
    if(event.target.value.length >= 2){
      let wordToFind = event.target.value.toLowerCase();
      this.structuresToDisplay = this.structures;
      if(this.structuresToDisplay.length > 0){
        this.structuresToDisplay = this.structuresToDisplay.filter((line) => {
          console.log(line.mail!.search(wordToFind));
          return (line.mail!.toLowerCase().search(wordToFind) >= 0 || line.adr1!.toLowerCase().search(wordToFind) >= 0 ||
                  line.adr2!.toLowerCase().search(wordToFind) >= 0 || line.cp!.toLowerCase().search(wordToFind) >= 0 ||
                  line.ville!.toLowerCase().search(wordToFind) >= 0 || line.nomgerant!.toLowerCase().search(wordToFind) >= 0);
        });
      }
    } else {
      this.structuresToDisplay = this.structures;
    }
  }

  ngOnDestroy(): void {

    //this.linkToHereParams.unsubscribe();

    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
