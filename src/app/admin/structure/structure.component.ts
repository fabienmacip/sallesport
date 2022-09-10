import { Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Structure } from 'src/app/interfaces/structure';
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
        this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
      })
    } else {
      this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
        this.structures = structures;
      })
    }



  }


  initStructureForm(): void{
    this.structureForm = this.formBuilder.group({
      id: [0],
      adr1: ['2ème étage', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      adr2: ['3, rue des prés', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      cp: ['75003', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      ville: ['PARIS', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      sexegerant: ['F', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      nomgerant: ['Gineste', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      mail: ['gigi@yahoo.fr', [Validators.email, Validators.required, Validators.maxLength(45)]],
      password: ['mlkjmlkj', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
      actif: [true],
      grants: ['1'],
      partenaire: [this.partenaireId ?? 0],
      passwordConfirm: ['mlkjmlkj', [Validators.required]]
    })
  }


  onEditStructure(structure: Structure): void{
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
      partenaire: structure.partenaire ?? 0
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
      this.apiService.updateStructureActif(id, actif).subscribe({
        next: data => {
          this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
            this.structures = structures;
          })

        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
    }

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
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          })


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
      console.log("ELSE");
      debugger;
      delete structure.passwordConfirm;

      // UPDATE
      //delete structure.id;
      this.apiService.updateStructure(structureId, structure).subscribe({
        next: data => {
          //this.postId = data.id;
          //console.log(data);
          this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
            this.structures = structures;
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

    if(confirm("SUPPRIMER ?")){
      if(structureId && structureId != 0){
        this.apiService.deleteStructure(structureId).subscribe((part: Structure)=>{
          //console.log("Structure deleted, ", part);
          this.subscription = this.apiService.readStructureAll().subscribe((structures: Structure[])=>{
            this.structures = structures;
          });
          //this.router.navigate(['structures']);
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


  ngOnDestroy(): void {

    //this.linkToHereParams.unsubscribe();

    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
