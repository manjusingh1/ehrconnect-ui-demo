import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { LineChartComponent } from "./line-chart.component";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe("LineChartComponent", () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideCharts(withDefaultRegisterables()),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
