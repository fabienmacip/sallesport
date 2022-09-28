import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Structure } from 'src/app/interfaces/structure';
import { Mail } from 'src/app/interfaces/mail';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

declare const Swal: any;
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

  role: string = '';
  userId: number = 0;

  caseACocherActif: number = 0;

  currentStructure: any;

  subscription! : Subscription;

  displayCreateStructureForm: boolean = false;

  retour: string = 'Partenaires';
  titrePage: string = 'Enregistrer une nouvelle structure';
  sousTitrePage: string = 'Toutes les structures';

  grantsFormToggle: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    /* private router: Router */
  ) {}

  ngOnInit(): void {

    if(this.authService.getRole() != ''){
      this.role = <string>this.authService.getRole();
    }

    if(this.authService.getId() != ''){
      this.userId = Number(this.authService.getId());
    }

    this.partenaireId = Number(this.activatedRoute.snapshot.paramMap.get('partenaireId'));
    this.partenaireNomFranchise = <string>this.activatedRoute.snapshot.paramMap.get('partenaireNomFranchise');

    if(this.role == 'admin'){

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
    } else if(this.role == 'partenaire'){
      if(this.partenaireId !== 0) {
        this.retour = 'Ma fiche';
        this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
          structures = structures.filter((s) => s.actif == 1);
          this.structures = structures;
          this.structuresToDisplay = structures;
          this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
        })
      }
    }

  }

  initStructureForm(): void{
    this.structureForm = this.formBuilder.group({
      id: [0],
      adr1: ['2ème étage', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      adr2: ['3, rue des prés', [Validators.minLength(2), Validators.maxLength(60)]],
      cp: ['75003', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
      ville: ['PARIS', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      sexegerant: ['F', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      nomgerant: ['Gineste', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      mail: ['gigi@yahoo.fr', [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: ['mlkjmlkj', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
      actif: [false],
      grants: ['1'],
      partenaire: [this.partenaireId ?? 0],
      passwordConfirm: ['mlkjmlkj', [Validators.required]]
    });
  }

  toggleDisplayCreateStructureForm(): void{
    this.displayCreateStructureForm = !this.displayCreateStructureForm;
    if(!this.displayCreateStructureForm){
      this.caseACocherActif = 0;
      this.titrePage = 'Enregistrer une nouvelle structure';
    }
  }

  onEditStructure(structure: Structure): void{

    this.grantsFormToggle = 0;
    this.caseACocherActif = 1;

    this.titrePage = 'Modifier une structure';
    this.displayCreateStructureForm = true;

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
    const btnMsg = actif == 1 ? "désactiver !" : "activer !";
    Swal.fire({
      title: confirmMsg,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, '+ btnMsg
    }).then((result: any) => {
      if (result.isConfirmed) {
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
  });
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
                  structure.nomgerant + " située à l'adresse suivante :<br><b>\n" +
                  structure.adr1 + " " + structure.adr2 + " à " + structure.ville + "</b>";


          this.subscription = this.apiService.readLastStructureOfPartenaire(this.partenaireId).subscribe((uneStructure: Structure[])=>{
            let dernierId = uneStructure[0].id?.toString();

            let mail: Mail = {
              id: 0,
              titre: "Structure créée, à activer. Gérée par " + this.sexeGerant(structure.sexegerant!) + " " + structure.nomgerant,
              corps: "Cher partenaire, nous vous informons que " + qui + " a été créée. Pour l'activer, merci de cliquer sur le bouton ci-dessous.",
              lien: dernierId,
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
          })
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });

    } else {

      delete structure.passwordConfirm;

      // UPDATE
      this.apiService.updateStructure(structureId, structure).subscribe({
        next: data => {
          this.subscription = this.apiService.readStructuresOfPartenaire(this.partenaireId).subscribe((structures: Structure[])=>{
            this.structures = structures;
            this.structuresToDisplay = structures;
            this.sousTitrePage = "Structure(s) du partenaire " + this.partenaireNomFranchise;
          });
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
    this.structureForm.reset();
    this.caseACocherActif = 0;
    this.structureForm.controls['partenaire'].setValue(this.partenaireId);
    this.titrePage = 'Enregistrer une nouvelle structure';
    this.displayCreateStructureForm = false;
  }

  onDeleteStructure(structureId?: number): void{

    this.grantsFormToggle = 0;

/*     const that = this; */
    Swal.fire({
      title: 'Etes-vous sûr(e) de vouloir effacer cette structure ?',
      text: "Cette opération est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, effacer !'
    }).then((result: any) => {
      if (result.isConfirmed) {
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
    });
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
    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
