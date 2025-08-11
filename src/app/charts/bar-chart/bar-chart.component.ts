import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import {
  CategoryScale,
  ChartData,
  ChartOptions,
  ChartType,
  registerables,
} from "chart.js";
import Chart from "chart.js/auto";
import scrollBarPlugin from "chartjs-plugin-scroll-bar";
import zoomPlugin from "chartjs-plugin-zoom";
import { BaseChartDirective } from "ng2-charts";
import { catchError, EMPTY, Subject, takeUntil, tap } from "rxjs";
import { ChartCountComponent } from "../../componenets/dashboard/chart-count/chart-count.component";
import { BarChartData, ChartDataCount } from "../../models/chart.model";
import { ChartService } from "../../service/chart.service";
import { updateChartCountData } from "../../shared/helper/chart-helper";

Chart.register(...registerables, zoomPlugin, scrollBarPlugin);
Chart.register(CategoryScale);

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
  standalone: true,
  imports: [
    BaseChartDirective,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    ChartCountComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  currentRoute: string = "";
  isLoading = false;
  barChartCountData: ChartDataCount[] = [
    { category: "TRAN_STATUS_SUCC", statusCount: 0 },
    { category: "TRAN_STATUS_FAIL", statusCount: 0 },
    { category: "TRAN_STATUS_PROG", statusCount: 0 },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // stacked: true,
        ticks: {
          callback: function (value) {
            const label = this.getLabelForValue(value as number);
            return label.length > 15 ? label.substr(0, 12) + "..." : label;
          },
        },
        // ticks: {
        //   callback: (value) => {
        //     const label = this.chart?.chart?.scales['x'].getLabelForValue(value as number);
        //     const currentRoute = this.router.url;
        //     console.log('Current Route:', currentRoute);
        //     console.log('Label:', label);
        //     if (currentRoute !== '/bam/by-clinics' && label) {
        //       return label.length > 15 ? label.substr(0, 12) + "..." : label;
        //     }
        //     console.log('lable', label)
        //     return label;
        //   },
        // },
      },
      y: {
        // stacked: true,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
  };

  #destroyMemory$: Subject<void>;

  public barChartLabels: string[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [
      { data: [], label: "Transaction Success", barThickness: 15 },
      { data: [], label: "Transaction In Progress", barThickness: 15 },
      { data: [], label: "Transaction Failure", barThickness: 15 },
    ],
  };

  public startDate!: string;
  public endDate!: string;
  allData: BarChartData[] = [];
  dateForm: FormGroup;

  constructor(
    private chartService: ChartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.#destroyMemory$ = new Subject<void>();
    // const formOptions: AbstractControlOptions = { validators: this.dateRangeValidator };
    this.dateForm = this.fb.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    const currentDate = new Date();
    this.endDate = this.formatDate(currentDate);
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 7);
    this.startDate = this.formatDate(startDate);

    this.dateForm.setValue({
      startDate: this.startDate,
      endDate: this.endDate,
    });

    this.dateForm.valueChanges
      .pipe(takeUntil(this.#destroyMemory$))
      .subscribe(() => {
        if (this.dateForm.valid) {
          this.filterData();
        }
      });

    this.filterData();
  }

  filterData(): void {
    this.isLoading = true;
    const { startDate, endDate } = this.dateForm.value;
    const startDateEpoch = startDate ? new Date(startDate).getTime() : null;
    const endDateEpoch = endDate ? new Date(endDate).getTime() : null;
    this.updateChart(startDateEpoch ?? 0, endDateEpoch ?? 0);
    this.getBarChartDataCount(startDateEpoch ?? 0, endDateEpoch ?? 0);
  }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startDate = group.get("startDate")?.value;
    const endDate = group.get("endDate")?.value;
    return startDate && endDate && startDate >= endDate
      ? { invalidDateRange: true }
      : null;
  }

  updateChart(startDate: number, endDate: number): void {
    this.chartService
      .getBarChartData(startDate, endDate)
      .subscribe((response: BarChartData[]) => {
        this.isLoading = false;
        if (response) {
          const successData = response.filter(
            (item) => item.category === "TRAN_STATUS_SUCC"
          );
          const inProgressData = response.filter(
            (item) => item.category === "TRAN_STATUS_PROG"
          );
          const failData = response.filter(
            (item) => item.category === "TRAN_STATUS_FAIL"
          );

          const labels = [...new Set(response.map((item) => item.displayName))];
          const successCounts = labels.map((label) => {
            const item = successData.find((data) => data.displayName === label);
            return item ? item.count : 0;
          });
          const inProgressCounts = labels.map((label) => {
            const item = inProgressData.find(
              (data) => data.displayName === label
            );
            return item ? item.count : 0;
          });

          const failCount = labels.map((label) => {
            const item = failData.find((data) => data.displayName === label);
            return item ? item.count : 0;
          });

          this.barChartLabels = labels;
          this.barChartData.labels = labels;
          this.barChartData.datasets[0].data = successCounts;
          this.barChartData.datasets[0].backgroundColor = "#6fe871"; // Green for success
          this.barChartData.datasets[1].data = inProgressCounts;
          this.barChartData.datasets[1].backgroundColor = "#FFCE56"; // Yellow for in progress
          this.barChartData.datasets[2].data = failCount;
          this.barChartData.datasets[2].backgroundColor = "#FF6384";
          this.updateStackedProperty();
        }
      });
  }

  updateStackedProperty(): void {
    const datasetCount = this.barChartData.labels?.length ?? 0;
    console.log("datasetCount", datasetCount);
    const isStacked = datasetCount > 6;

    if (this.barChartOptions.scales?.["x"]) {
      (this.barChartOptions.scales["x"] as any).stacked = isStacked;
    }
    if (this.barChartOptions.scales?.["y"]) {
      (this.barChartOptions.scales["y"] as any).stacked = isStacked;
    }

    this.chart?.update();
  }

  getBarChartDataCount(startDate: number, endDate: number): void {
    this.chartService
      .getBarChartDataCount(startDate, endDate)
      .pipe(
        tap((response) => {
          this.barChartCountData = [
            { category: "TRAN_STATUS_SUCC", statusCount: 0 },
            { category: "TRAN_STATUS_FAIL", statusCount: 0 },
            { category: "TRAN_STATUS_PROG", statusCount: 0 },
          ];
          this.barChartCountData = updateChartCountData(
            response.data,
            this.barChartCountData
          );
          console.log("res", response);
        }),
        catchError((error) => {
          console.log("err", error);
          return EMPTY;
        }),
        takeUntil(this.#destroyMemory$)
      )
      .subscribe();
  }

  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  ngOnDestroy(): void {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
