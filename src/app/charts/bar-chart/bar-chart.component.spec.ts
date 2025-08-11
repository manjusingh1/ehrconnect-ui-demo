import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BarChartComponent } from "./bar-chart.component";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe("BarChartComponent", () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideCharts(withDefaultRegisterables()),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
