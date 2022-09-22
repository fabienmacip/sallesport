import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { HomeComponent } from "./home.component";




 describe('Test HOME component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test : ROLE', () => {
    const role = component.role;
    if(role && role == 'admin'){
      expect('admin').toBe(localStorage.getItem('role')!);
    }
  });

 });

