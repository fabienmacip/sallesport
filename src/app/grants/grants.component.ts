import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Grants } from '../interfaces/grants';


@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.css']
})
export class GrantsComponent implements OnInit {

  grants?: Grants[];
  currentGrant?: Grants;
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

  ngOnInit(): void {
    this.apiService.readGrants(1).subscribe((grants: Grants[]) => {
      this.grants = grants;
      this.currentGrant = grants[0];
      console.log(this.currentGrant);
    })
  }

  onToggleGrants(column: string, id: number = 0){


    return console.log("TOGGLE Grant n°" + id + " in column ("+column+")");
  }

}
