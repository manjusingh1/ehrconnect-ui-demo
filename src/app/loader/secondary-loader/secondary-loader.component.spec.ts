import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SecondaryLoaderComponent } from "./secondary-loader.component";

describe("ErrorComponent", () => {
  let component: SecondaryLoaderComponent;
  let fixture: ComponentFixture<SecondaryLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
