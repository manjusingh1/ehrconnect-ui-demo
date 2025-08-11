import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LocationBackComponent } from "./location-back.component";

describe("LocationBackComponent", () => {
  let component: LocationBackComponent;
  let fixture: ComponentFixture<LocationBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
