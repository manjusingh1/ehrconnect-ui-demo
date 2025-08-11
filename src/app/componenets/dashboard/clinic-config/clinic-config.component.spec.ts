import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClinicConfigComponent } from "./clinic-config.component";

describe("ClinicConfigComponent", () => {
  let component: ClinicConfigComponent;
  let fixture: ComponentFixture<ClinicConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
