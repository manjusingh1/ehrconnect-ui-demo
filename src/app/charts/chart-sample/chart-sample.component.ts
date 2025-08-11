import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables,
} from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { WebSocketService } from "../../service/web-socket.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";

Chart.register(...registerables);

@Component({
  selector: "app-chart-sample",
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
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
  ],
  templateUrl: "./chart-sample.component.html",
  styleUrl: "./chart-sample.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartSampleComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<"line">["data"] = {
    labels: [],
    datasets: [{ data: [], label: "" }],
  };

  public lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: { type: "timeseries", time: { unit: "second" } },
      y: { beginAtZero: true },
    },
  };

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.getLiveData().subscribe((data) => {
      this.updateChart(data);
    });
  }

  updateChart(data: { time: string; category: string; statusCount: number }) {
    let dataset = this.lineChartData.datasets.find(
      (d) => d.label === data.category,
    );

    if (!dataset) {
      dataset = {
        label: data.category,
        data: [],
        borderColor: this.getRandomColor(),
        fill: false,
      };
      this.lineChartData.datasets.push(dataset);
    }

    dataset.data.push({
      x: new Date(data.time).getTime(),
      y: data.statusCount,
    });

    const kk = this.lineChartData?.labels?.length || 0;
    if (kk > 20) {
      this.lineChartData?.labels?.shift();
      this.lineChartData.datasets.forEach((ds) => ds.data.shift());
    }

    this.chart?.update();
  }

  getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
}
