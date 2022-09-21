import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Partenaire } from 'src/app/interfaces/partenaire';
import { AuthService } from 'src/app/services/auth.service';

declare const Swal: any;
@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.css']
})
export class PartenaireComponent implements OnInit, OnDestroy {

  partenaireForm!: FormGroup;

  partenaires: Partenaire[] = [];
  partenairesToDisplay: Partenaire[] = [];

  role: string = '';
  userId: number = 0;

  currentPartenaire: any;

  displayCreatePartenaireForm: boolean = false;

  subscription! : Subscription;

  titrePage: string = 'Enregistrer un nouveau partenaire';

  grantsFormToggle: number = 0;

  lesChecboxesFonctionnent = false; // Utilisé pour savoir si on affiche les checkboxes comme indiqué ici :
  // https://remotestack.io/angular-checkboxes-tutorial-example/

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    if(this.authService.getRole() != ''){
      this.role = <string>this.authService.getRole();
    }

    if(this.authService.getId() != ''){
      this.userId = Number(this.authService.getId());
    }

    if(this.role == 'admin'){
      this.initPartenaireForm();
      this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
        this.partenaires = partenaires;
        this.partenairesToDisplay = partenaires;
      })
    } else if(this.role == 'partenaire'){
      this.subscription = this.apiService.readPartenaire(Number(this.userId)).subscribe((partenaires: Partenaire[])=>{
        this.partenaires = partenaires;
        this.partenairesToDisplay = partenaires;
      })
    }
  }

  initPartenaireForm(): void{
    this.partenaireForm = this.formBuilder.group({
      id: [0],
      nomfranchise: ['TEST', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      sexegerant: ['M', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      nomgerant: ['Durand', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      mail: ['dudu@gmail.fr', [Validators.email, Validators.required, Validators.maxLength(45)]],
      password: ['qsdfqsdf', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]],
      actif: [true],
      grants: ['1'],
      passwordConfirm: ['qsdfqsdf', [Validators.required]]
    })
  }

  toggleDisplayCreatePartenaireForm(): void{
    this.displayCreatePartenaireForm = !this.displayCreatePartenaireForm;
    if(this.displayCreatePartenaireForm){
      this.initPartenaireForm();
      this.titrePage = 'Enregistrer un nouveau partenaire';
    }
  }

  onEditPartenaire(partenaire: Partenaire): void{

    this.grantsFormToggle = 0;

    this.titrePage = 'Modifier un partenaire';
    this.displayCreatePartenaireForm = true;


    this.partenaireForm.setValue({
      id: partenaire.id ?? '',
      nomfranchise : partenaire.nomfranchise ?? '',
      sexegerant : partenaire.sexegerant ?? 'M',
      nomgerant: partenaire.nomgerant ?? '',
      mail: partenaire.mail,
      password: partenaire.password,
      passwordConfirm: partenaire.password,
      actif: partenaire.actif == 0 ? false : true,
      grants: partenaire.grants ?? 0,

    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    console.log(this.partenaireForm);
}

  onTogglePartenaireActif(id: string, actif: number): void{

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
        this.partenaireForm.reset();
        this.apiService.updatePartenaireActif(id, actif).subscribe({
          next: data => {
            this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
              this.partenaires = partenaires;
              this.partenairesToDisplay = partenaires;
            })

          },
          error: error => {
            //this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
      }
    });


/*     if(confirm(confirmMsg)){
    }
 */
  }

  onSubmitPartenaireForm(): void{

    const partenaireId = this.partenaireForm.value.id;

    let partenaire = this.partenaireForm.value;
    if(!partenaireId || partenaireId && partenaireId == 0){

      // CREATE ligne PARTENAIRE
      partenaire.id = "";
      delete partenaire.passwordConfirm;
      //this.router.navigate(['/admin','dashboard']);



      this.apiService.createPartenaire(partenaire).subscribe({
        next: data => {
          //this.postId = data.id;
          //console.log(data);
          //this.partenaires.push(partenaire);



          // Rechargement des données
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
            this.partenairesToDisplay = partenaires;
          })

        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    } else {

      delete partenaire.passwordConfirm;


      // UPDATE
      //delete partenaire.id;
      this.apiService.updatePartenaire(partenaireId, partenaire).subscribe({
        next: data => {
          //this.postId = data.id;
          //console.log(data);
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
            this.partenairesToDisplay = partenaires;
          });
        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    }

    this.partenaireForm.reset();
    this.titrePage = 'Enregistrer un nouveau partenaire';


  }

  onDeletePartenaire(partenaireId?: number): void{

    this.grantsFormToggle = 0;

    /* const that = this; */
    Swal.fire({
      title: 'Etes-vous sûr(e) de vouloir effacer ce partenaire ?',
      text: "Cette opération est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, effacer !'
    }).then((result: any) => {
      if (result.isConfirmed) {
        if(partenaireId && partenaireId != 0){
          this.apiService.deletePartenaire(partenaireId).subscribe((part: Partenaire)=>{
            this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
              Swal.fire(
                    'Effacé !',
                    'Ce partenaire a été effacé',
                    'success'
                  )
              this.partenaires = partenaires;
              this.partenairesToDisplay = partenaires;
            });
          });
        } else {
          console.error('Un id doit être fourni pour pouvoir supprimer ce partenaire.');
        }
      }
    });

/*     if(confirm("SUPPRIMER ?")){
      if(partenaireId && partenaireId != 0){
        this.apiService.deletePartenaire(partenaireId).subscribe((part: Partenaire)=>{
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
            this.partenairesToDisplay = partenaires;
          });
        });
      } else {
        console.error('Un id doit être fourni pour pouvoir supprimer ce partenaire.');
      }
    }
 */

}

  onToggleGrantsForm(partenaireId: number = 0){

    if(this.grantsFormToggle == partenaireId){
      this.grantsFormToggle = 0;
    } else {
      this.grantsFormToggle = partenaireId;
    }

  }

  onChangeSeekPartenaire(event : any): void{
    if(event.target.value.length >= 2){
      let wordToFind = event.target.value.toLowerCase();
      this.partenairesToDisplay = this.partenaires;
      if(this.partenairesToDisplay.length > 0){
        this.partenairesToDisplay = this.partenairesToDisplay.filter((line) => {
          console.log(line.mail!.search(wordToFind));
          return (line.mail!.toLowerCase().search(wordToFind) >= 0 ||
                  line.nomfranchise!.toLowerCase().search(wordToFind) >= 0 ||
                  line.nomgerant!.toLowerCase().search(wordToFind) >= 0);
        });
      }
    } else {
      this.partenairesToDisplay = this.partenaires;
    }
  }



  ngOnDestroy(): void {
    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
