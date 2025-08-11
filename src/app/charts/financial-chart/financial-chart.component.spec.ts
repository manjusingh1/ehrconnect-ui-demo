import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FinancialChartComponent } from "./financial-chart.component";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from "chartjs-chart-financial";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe("FinancialChartComponent", () => {
  let component: FinancialChartComponent;
  let fixture: ComponentFixture<FinancialChartComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      imports: [FinancialChartComponent],
      providers: [
        provideNoopAnimations(),
        provideCharts(withDefaultRegisterables(), {
          registerables: [
            CandlestickController,
            CandlestickElement,
            OhlcController,
            OhlcElement,
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
