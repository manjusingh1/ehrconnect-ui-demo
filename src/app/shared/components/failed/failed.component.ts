import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-failed",
  standalone: true,
  imports: [],
  templateUrl: "./failed.component.html",
  styleUrl: "./failed.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailedComponent {}
