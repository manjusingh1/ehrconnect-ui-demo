import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AbbottAppToEhrServiceConfigComponent } from "./abbott-app-to-ehr-service-config.component";

describe("AbbottAppToEhrServiceConfigComponent", () => {
  let component: AbbottAppToEhrServiceConfigComponent;
  let fixture: ComponentFixture<AbbottAppToEhrServiceConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbbottAppToEhrServiceConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbbottAppToEhrServiceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
