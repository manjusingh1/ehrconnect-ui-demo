import { Component } from "@angular/core";
import { BarChartComponent } from "../../../charts/bar-chart/bar-chart.component";

@Component({
  selector: "app-by-clinic",
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: "./by-clinic.component.html",
  styleUrl: "./by-clinic.component.scss",
})
export class ByClinicComponent {}
