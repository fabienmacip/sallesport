import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patientList = [
    {
      id: 0,
      lastName: 'Dupont',
      firstName: 'Fabrice',
      dob: '1989-04-01',
      sex: 'M',
      height: '178',
      weight: '75'
    },    {
      id: 1,
      lastName: 'Bucanon',
      firstName: 'Michelle',
      dob: '1979-04-11',
      sex: 'F',
      height: '163',
      weight: '68'
    },    {
      id: 2,
      lastName: 'Roustit',
      firstName: 'Julien',
      dob: '1965-11-30',
      sex: 'M',
      height: '169',
      weight: '78'
    },    {
      id: 3,
      lastName: 'Iglesias',
      firstName: 'Juliette',
      dob: '2001-02-15',
      sex: 'F',
      height: '170',
      weight: '94'
    }
  ]

  currentPatient: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if(patientId !== null){
      this.currentPatient = this.patientList.find(el => el.id === +<string>patientId);
    }
  }

}
