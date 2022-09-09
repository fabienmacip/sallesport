import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Grants } from '../../interfaces/grants';
import { Partenaire } from 'src/app/interfaces/partenaire';

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.css']
})
export class GrantsComponent implements OnInit {

  @Input() partenaire!: Partenaire;

  grants?: Grants[];
  currentGrant?: Grants;
  currentGrantArray?: any;
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

    const grantsId = this.partenaire.grants ?? 0 ;

    this.apiService.readGrants(grantsId).subscribe((grants: Grants[]) => {
      this.grants = grants;
      this.currentGrant = this.grants[0];

      this.currentGrantArray = Object.entries(this.currentGrant);
      //console.log(this.currentGrantArray);
      this.currentGrantArray = this.currentGrantArray.filter(function (valeur: any) {
        return valeur[0] !== 'id';
      });
      this.currentGrantArray = this.currentGrantArray.map((e: any) =>{
        e.push(this.fullText(e[0]));
        console.log(e);
        return e;
      });
      console.log(this.currentGrantArray);
    });

  }

  onToggleGrants(column: string, active: number = 0){

    return console.log("TOGGLE Grant column "+column+"("+active+")");
  }

}
