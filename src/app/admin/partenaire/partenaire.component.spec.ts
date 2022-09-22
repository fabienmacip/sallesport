import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { PartenaireComponent } from "./partenaire.component";



describe('Test admin/partenaires component', () => {

  let component: PartenaireComponent;
  let fixture: ComponentFixture<PartenaireComponent>;
  let fakeApiService: any;
  let fakeFormBuilder: any
  let userService: any;

/*   beforeEach(() => {
    fakeUserService = {
      isAuth: true,
      user : {username: "Jeanne"}
    }
  }); */

/*   beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartenaireComponent],
      providers: [{provide: ApiService, useValue: fakeApiService},
                  {provide: FormBuilder, useValue: fakeFormBuilder}]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); */

/*   it('Should create', () => {
    expect(component).toBeTruthy();
  });
 */
/*   it('Test : Titre page', () => {
    const partenaireId = component.currentPartenaire.id;
    if(partenaireId && partenaireId > 0){
      expect('Modifier un partenaire').toBe(component.titrePage);
    } else {
      expect('Enregistrer un nouveau partenaire').toBe(component.titrePage);
    }
  }); */

});

