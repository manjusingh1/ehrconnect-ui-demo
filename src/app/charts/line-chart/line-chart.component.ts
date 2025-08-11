import { CommonModule, DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { Router } from "@angular/router";
import { ChartData, ChartOptions, ChartType } from "chart.js";
import "chartjs-adapter-date-fns";
import { DragOptions } from "chartjs-plugin-zoom/types/options";
import { subDays, subMonths, subYears } from "date-fns";
import { BaseChartDirective } from "ng2-charts";
import { catchError, EMPTY, Subject, Subscription, takeUntil, tap } from "rxjs";
import { ChartCountComponent } from "../../componenets/dashboard/chart-count/chart-count.component";
import {
  AllData,
  ChartDataCount,
  ChartDataOption,
  DateCount,
  GetLineDataResponse,
  LiveStatus,
  WebSocketResponse,
} from "../../models/chart.model";
import { RxStompService } from "../../rx-stomp.service";
import { ChartService } from "../../service/chart.service";
import { updateChartCountData } from "../../shared/helper/chart-helper";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseChartDirective,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatSliderModule,
    MatButtonToggleModule,
    ChartCountComponent,
  ],
  providers: [DatePipe],
})
export class LineChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private topicSubscription?: Subscription;
  #destroyMemory$: Subject<void>;
  allData: AllData[] = [];
  lineChartCountData: ChartDataCount[] = [
    { category: "TRAN_STATUS_SUCC", statusCount: 0 },
    { category: "TRAN_STATUS_FAIL", statusCount: 0 },
    { category: "TRAN_STATUS_PROG", statusCount: 0 },
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "timeseries",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm",
          },
        },
        ticks: {
          major: {
            enabled: true,
          },
          font: (context) => {
            const boldedTicks: any =
              context.tick && context.tick.major ? "bold" : "";
            return { weight: boldedTicks };
          },
          // stepSize: 1, // Show labels at 30-minute intervals
          // autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      datalabels: {
        display: false, // Disable data labels on points
      },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
            threshold: 100,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            backgroundColor: "rgba(158, 203, 249, 0.1)",
            modifierKey: "shift",
            drawTime: "afterDatasetsDraw",
            maintainAspectRatio: false,
          } as DragOptions,
          wheel: { enabled: false },
          pinch: { enabled: false },
          mode: "x",
        },
        pan: { enabled: true, mode: "x" },
      },
      legend: {
        display: true,
        labels: {
          boxWidth: 10,
          font: { size: 11 },
        },
      },
    },
  };
  currentRoute: string = "";

  public lineChartType: ChartType = "line";
  public lineChartLegend = true;
  public lineChartLabels: string[] = [];
  public lineChartData: ChartData<"line"> = {
    labels: [],
    datasets: [
      {
        data: [],
        cubicInterpolationMode: "monotone",
        tension: 0.4,
        capBezierPoints: true,
      },
    ],
  };

  constructor(
    private chartService: ChartService,
    private rxStompService: RxStompService,
    private router: Router,
  ) {
    this.currentRoute = this.router.url;
    this.#destroyMemory$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.getLineChartData();
    this.getLineChartLiveData();
  }

  getLineChartData(days?: number): void {
    this.chartService
      .getLineChartData(days ?? 0)
      .pipe(
        tap((response: GetLineDataResponse) => {
          this.lineChartCountData = [
            { category: "TRAN_STATUS_SUCC", statusCount: 0 },
            { category: "TRAN_STATUS_FAIL", statusCount: 0 },
            { category: "TRAN_STATUS_PROG", statusCount: 0 },
          ];
          this.processBackendData(response.liveStatus);
          if (response) {
            updateChartCountData(response.counts, this.lineChartCountData);
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

  getLineChartLiveData() {
    this.topicSubscription = this.rxStompService
      .watch("/topic/demo")
      .subscribe((message: any) => {
        if (message.body?.length > 0) {
          const data: WebSocketResponse | any = JSON.parse(message.body);
          console.log("data", data);
          this.processBackendData(data.liveStatus);
          updateChartCountData(data.counts, this.lineChartCountData);
        }
      });
  }

  private processBackendData(liveStatus: LiveStatus[]): void {
    this.allData = [];
    this.lineChartData.datasets = [];

    liveStatus?.forEach((clinic, index) => {
      const clinicData = clinic.dateCount.map((entry: DateCount) => ({
        x: entry.dateHourTime,
        y: entry.count,
      }));

      this.lineChartData.datasets.push({
        label: clinic.clinicName,
        data: clinicData,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
        capBezierPoints: true,
      });

      this.allData.push(
        ...clinicData.map((entry: any) => ({
          category: clinic.clinicName,
          time: entry.x,
          statusCount: entry.y,
        })),
      );
    });

    this.updateChartData();
  }

  private updateChartData(): void {
    const recentData = this.allData;

    this.lineChartLabels = recentData.map((data) =>
      new Date(data.time).toISOString(),
    );
    this.lineChartData.labels = this.lineChartLabels;

    this.lineChartData.datasets.forEach((dataset: any) => {
      console.log("dataset", dataset);
      dataset.data = recentData
        .filter((data) => data.category === dataset.label)
        .map((data) => ({ x: data.time, y: data.statusCount }));
    });

    // Ensure minY and maxY are defined
    const minY = Math.min(...recentData.map((data) => data.statusCount));
    const maxY = Math.max(...recentData.map((data) => data.statusCount));

    // Check if scales and y properties exist before setting suggestedMin and suggestedMax
    if (this.lineChartOptions.scales && this.lineChartOptions.scales["y"]) {
      this.lineChartOptions.scales["y"].suggestedMin = Math.floor(minY) - 1; // Adjust as needed
      this.lineChartOptions.scales["y"].suggestedMax = Math.ceil(maxY) + 1; // Adjust as needed
    } else {
      // Initialize scales and y if they are undefined
      this.lineChartOptions.scales = {
        ...this.lineChartOptions.scales,
        y: {
          suggestedMin: Math.floor(minY) - 1, // Adjust as needed
          suggestedMax: Math.ceil(maxY) + 1, // Adjust as needed
        },
      };
    }

    // Adjust x-axis to show 10 minutes before and after the data range
    const minX = new Date(
      Math.min(...recentData.map((data) => new Date(data.time).getTime())),
    );
    const maxX = new Date(
      Math.max(...recentData.map((data) => new Date(data.time).getTime())),
    );
    minX.setMinutes(minX.getMinutes() - 10);
    maxX.setMinutes(maxX.getMinutes() + 10);

    if (this.lineChartOptions.scales && this.lineChartOptions.scales["x"]) {
      this.lineChartOptions.scales["x"].min = minX?.toISOString();
      this.lineChartOptions.scales["x"].max = maxX?.toISOString();
    } else {
      this.lineChartOptions.scales = {
        ...this.lineChartOptions.scales,
        x: {
          min: minX.toISOString(),
          max: maxX.toISOString(),
        },
      };
    }

    const now = new Date();
    this.filterDataByDateRange(subDays(now, 1), now);
  }

  setTimeRange(range: "1D" | "3D" | "5D" | "1M" | "1Y" | "ALL"): void {
    const now = new Date();
    let startDate: Date;
    let timeUnit: string;
    let displayFormats: any;

    switch (range) {
      case "1D":
        this.getLineChartData(1);
        startDate = subDays(now, 1);
        timeUnit = "hour";
        displayFormats = { hour: "HH:mm" };
        break;
      case "3D":
        this.getLineChartData(3);
        startDate = subDays(now, 3);
        timeUnit = "day";
        displayFormats = { day: "MMM d" };
        break;
      case "5D":
        this.getLineChartData(5);
        startDate = subDays(now, 5);
        timeUnit = "day";
        displayFormats = { day: "MMM d" };
        break;
      case "1M":
        this.getLineChartData(30);
        startDate = subMonths(now, 1);
        timeUnit = "day";
        displayFormats = { day: "MMM d" };
        break;
      case "1Y":
        this.getLineChartData(365);
        startDate = subYears(now, 1);
        timeUnit = "month";
        displayFormats = { month: "MMM" };
        break;
      // case "ALL":
      //   this.getLineChartData(365);
      //   startDate = subYears(now, 1);
      //   timeUnit = "month";
      //   displayFormats = { month: "MMM" };
      //   break;
      default:
        startDate =
          this.allData.length > 0 ? new Date(this.allData[0].time) : now;
        timeUnit = "hour";
        displayFormats = { hour: "HH:mm" };
    }

    if (this.lineChartOptions.scales?.["x"]?.type === "timeseries") {
      this.lineChartOptions.scales["x"]["time"] = {
        unit: timeUnit as any,
        displayFormats: displayFormats,
      };
    }

    this.filterDataByDateRange(startDate, now);
  }

  private filterDataByDateRange(startDate: Date, endDate: Date): void {
    this.lineChartLabels = this.allData
      .filter(
        (data) =>
          new Date(data.time) >= startDate && new Date(data.time) <= endDate,
      )
      .map((data) => new Date(data.time).toISOString());

    this.lineChartData.labels = this.lineChartLabels;
    this.lineChartData.datasets.forEach((dataset: any) => {
      dataset.data = this.allData
        .filter((data) => data.category === dataset.label)
        .map((data) => ({ x: data.time, y: data.statusCount }));
    });
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
    this.topicSubscription?.unsubscribe();
  }
}
