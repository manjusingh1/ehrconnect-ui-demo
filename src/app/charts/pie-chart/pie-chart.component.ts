import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ChartData, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { catchError, EMPTY, Subject, takeUntil, tap } from "rxjs";
import { ChartCountComponent } from "../../componenets/dashboard/chart-count/chart-count.component";
import { ChartDataCount, PieChartData } from "../../models/chart.model";
import { ChartService } from "../../service/chart.service";
import { updateChartCountData } from "../../shared/helper/chart-helper";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
  standalone: true,
  imports: [
    MatButtonModule,
    BaseChartDirective,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    ChartCountComponent,
    MatIconModule,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 12,
        },
      },
    },
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = "pie";
  public barChartLegend = true;
  public pieChartData: ChartData<"pie"> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#6fe871", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  #destroyMemory$: Subject<void>;

  startDate!: string;
  allData: PieChartData[] = [];
  pieChartCountData: ChartDataCount[] = [
    { category: "TRAN_STATUS_SUCC", statusCount: 0 },
    { category: "TRAN_STATUS_FAIL", statusCount: 0 },
    { category: "TRAN_STATUS_PROG", statusCount: 0 },
  ];

  constructor(private chartService: ChartService) {
    this.#destroyMemory$ = new Subject<void>();
  }

  ngOnInit(): void {
    const startDate = new Date();
    this.startDate = this.formatDate(startDate);

    this.updateChart();
  }

  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  updateChart(startDate?: number): void {
    const formattedDate = this.formatDateToEpoch(new Date().toISOString());
    this.getBarChartDataCount(startDate ?? formattedDate);
    this.chartService
      .getPieChartData((startDate ?? formattedDate).toString())
      .subscribe((response: PieChartData[]) => {
        if (response) {
          this.allData = response.map((item) => {
            const mappedCategory = this.mapCategoryToDate(item.category);
            return {
              category: mappedCategory.label,
              statusCount: item.statusCount,
              color: mappedCategory.color,
            };
          });

          const labels = this.allData.map((item) => item.category);
          const data = this.allData.map((item) => item.statusCount);
          const backgroundColors = this.allData.map((item) => item.color);

          this.pieChartLabels = labels;
          this.pieChartData.labels = labels;
          this.pieChartData.datasets[0].data = data;
          this.pieChartData.datasets[0].backgroundColor = backgroundColors;
          this.chart?.update();
        }
      });
  }

  mapCategoryToDate(category: string): { label: string; color: string } {
    switch (category) {
      case "TRAN_STATUS_PROG":
        return { label: "In Progress", color: "#FFCE56" }; // Yellow
      case "TRAN_STATUS_SUCC":
        return { label: "Success", color: "#6fe871" }; // Green
      case "TRAN_STATUS_FAIL":
        return { label: "Fail", color: "#FF6384" }; // Red
      default:
        return { label: "Unknown", color: "#FF6999" }; // Default color
    }
  }

  getBarChartDataCount(startDate: number): void {
    this.chartService
      .getPieChartDataCount(startDate)
      .pipe(
        tap((response) => {
          this.pieChartCountData = [
            { category: "TRAN_STATUS_SUCC", statusCount: 0 },
            { category: "TRAN_STATUS_FAIL", statusCount: 0 },
            { category: "TRAN_STATUS_PROG", statusCount: 0 },
          ];
          if (response) {
            this.pieChartCountData = updateChartCountData(
              response.data,
              this.pieChartCountData,
            );
            console.log("res", response);
          }
        }),
        catchError((error) => {
          console.log("err", error);
          return EMPTY;
        }),
        takeUntil(this.#destroyMemory$),
      )
      .subscribe();
  }

  filterData(): void {
    const formattedDate = this.formatDateToEpoch(this.startDate.toString());
    this.updateChart(formattedDate);
  }

  formatDateToEpoch(date: string): number {
    return new Date(date).getTime();
  }

  ngOnDestroy(): void {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
