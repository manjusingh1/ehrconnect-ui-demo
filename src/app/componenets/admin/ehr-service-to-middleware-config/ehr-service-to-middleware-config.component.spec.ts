import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EhrServiceToMiddlewareConfigComponent } from "./ehr-service-to-middleware-config.component";

describe("EhrServiceToMiddlewareConfigComponent", () => {
  let component: EhrServiceToMiddlewareConfigComponent;
  let fixture: ComponentFixture<EhrServiceToMiddlewareConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EhrServiceToMiddlewareConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EhrServiceToMiddlewareConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
