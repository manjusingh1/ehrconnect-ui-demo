import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ByClinicComponent } from "./by-clinic.component";

describe("ByClinicComponent", () => {
  let component: ByClinicComponent;
  let fixture: ComponentFixture<ByClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByClinicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ByClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
