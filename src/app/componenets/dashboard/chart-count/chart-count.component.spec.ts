import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChartCountComponent } from "./chart-count.component";

describe("ChartCountComponent", () => {
  let component: ChartCountComponent;
  let fixture: ComponentFixture<ChartCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
