import { Component } from "@angular/core";
import { LineChartComponent } from "../../../charts/line-chart/line-chart.component";

@Component({
  selector: "app-live-status",
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: "./live-status.component.html",
  styleUrl: "./live-status.component.scss",
})
export class LiveStatusComponent {}
