import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EhrConfigDetailsComponent } from "./ehr-config-details.component";

describe("EhrConfigDetailsComponent", () => {
  let component: EhrConfigDetailsComponent;
  let fixture: ComponentFixture<EhrConfigDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EhrConfigDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EhrConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
