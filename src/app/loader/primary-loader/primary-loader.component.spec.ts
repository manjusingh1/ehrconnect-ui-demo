import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PrimaryLoaderComponent } from "./primary-loader.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("ErrorComponent", () => {
  let component: PrimaryLoaderComponent;
  let fixture: ComponentFixture<PrimaryLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryLoaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
