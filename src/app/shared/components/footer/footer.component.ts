import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
