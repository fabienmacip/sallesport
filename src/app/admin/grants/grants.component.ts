import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Grants } from '../../interfaces/grants';
import { Mail } from 'src/app/interfaces/mail';
import { Partenaire } from 'src/app/interfaces/partenaire';
import { Structure } from 'src/app/interfaces/structure';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.css']
})
export class GrantsComponent implements OnInit {

  @Input() partenaire!: Partenaire;
  @Input() structure!: Structure;

  partenaireId: number = 0;
  structureId: number = 0;


  grants?: Grants[];
  currentGrant?: Grants;
  currentGrantArray?: any;
  subscription! : Subscription;
  selectedGrants: Grants = {
    id: 0,
    membersread: 0,
    memberswrite: 0,
    membersadd: 0,
    membersupdate: 0,
    membersproductsadd: 0,
    memberspaymentscheduleread: 0,
    membersstatsread: 0,
    memberssubscriptionread: 0,
    paymentschedulesread: 0,
    paymentscheduleswrite: 0,
    paymentdayread: 0,
    drinksell: 0,
    foodsell: 0,
    sendnewsletter: 0
  }

  constructor(
    private apiService: ApiService
  ) { }

  sexeGerant(e: string) {
    return e.toLowerCase() == 'f' ? 'Mme' : 'M.';
  }

  fullText(e: string){
    switch(e) {
      case 'membersread': {
        return 'Lire les membres';
        break;
      }
      case 'memberswrite': {
        return 'Ecrire aux membres';
        break;
      }
      case 'membersadd': {
        return 'Ajouter un membre';
        break;
      }
      case 'membersupdate': {
        return 'Mettre à jour un membre';
        break;
      }
      case 'membersproductsadd': {
        return 'Ajouter un produit à un membre';
        break;
      }
      case 'memberspaymentscheduleread': {
        return 'Voir les échéances d\'un membre';
        break;
      }
      case 'membersstatsread': {
        return 'Voir les statistiques des membres';
        break;
      }
      case 'memberssubscriptionread': {
        return 'Voir les abonnements des membres';
        break;
      }
      case 'paymentschedulesread': {
        return 'Lire les échéances de virements';
        break;
      }
      case 'paymentscheduleswrite': {
        return 'Ecrire les échéances de virements';
        break;
      }
      case 'paymentdayread': {
        return 'Lire le jour de paiement';
        break;
      }
      case 'drinksell': {
        return 'Vendre des boissons';
        break;
      }
      case 'foodsell': {
        return 'Vendre de la nourriture';
        break;
      }
      case 'sendnewsletter': {
        return 'Envoyer des newsletters';
        break;
      }
      default: {
        return '';
        break
      }
    }
  }

  ngOnInit(): void {

    const grantsId = this.partenaire ? this.partenaire.grants ?? 0 : this.structure.grants ?? 0 ;
    this.partenaireId = this.partenaire ? <number>this.partenaire.id : this.structure ? <number>this.structure.partenaire : 0;
    this.structureId = this.structure ? <number>this.structure.id : 0;

    this.apiService.readGrants(grantsId).subscribe((grants: Grants[]) => {
      this.grants = grants;
      this.currentGrant = this.grants[0];

      this.currentGrantArray = Object.entries(this.currentGrant);
      this.currentGrantArray = this.currentGrantArray.filter(function (valeur: any) {
        return valeur[0] !== 'id';
      });
      this.currentGrantArray = this.currentGrantArray.map((e: any) =>{
        e.push(this.fullText(e[0]));
        return e;
      });
    });
  }

  onToggleGrants(id: number, column: string, active: number = 0){

    active = active == 0 ? 1 : 0;
    this.apiService.updateOneGrant(id , column, active).subscribe({
      next: data => {
            this.ngOnInit();

            let activeText = active == 0 ? "désactivé" : "activé";
            let qui = this.structureId == 0 ? "votre compte \"partenaire\"" :
                      "la structure gérée par " + this.sexeGerant(this.structure.sexegerant!) + " " +
                      this.structure.nomgerant + " située à l'adresse suivante\n" +
                      this.structure.adr1 + " " + this.structure.adr2 + " à " + this.structure.ville;

            let mail: Mail = {
              id: 0,
              titre: "Droit activé",
              corps: "Cher partenaire, nous vous informons que le droit \"" + this.fullText(column) + "\" a été " + activeText + " concernant " + qui,
              lien: "",
              lu: 0,
              partenaire: this.partenaireId
            }
            console.log(mail);
            //this.apiService.createMail(mail);

      },
      error: error => {
        console.error('There was an error!', error);
      }
    });


    // Appel API updateOne
    // + refresh
  }

}
