import { Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "hf-workspace-secondary-loader",
  templateUrl: "./secondary-loader.component.html",
  styleUrls: ["./secondary-loader.component.scss"],
  imports: [MatProgressSpinnerModule],
  standalone: true,
})
export class SecondaryLoaderComponent {
  @Input() isLoading: boolean | null | undefined;
}
