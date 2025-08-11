import { Component, Input } from "@angular/core";
import { ChartDataCount } from "../../../models/chart.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-chart-count",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./chart-count.component.html",
  styleUrl: "./chart-count.component.scss",
})
export class ChartCountComponent {
  @Input() chartCountData!: ChartDataCount[];
}
