import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lib-work-in-progress",
  standalone: true,
  imports: [],
  templateUrl: "./work-in-progress.component.html",
  styleUrl: "./work-in-progress.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkInProgressComponent {}
