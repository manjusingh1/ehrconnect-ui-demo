import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "lib-location-back",
  standalone: true,
  imports: [],
  templateUrl: "./location-back.component.html",
  styleUrl: "./location-back.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationBackComponent {
  @Input() navTitle = "";
  previousUrl: string | undefined;
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
