import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { tr } from "date-fns/locale";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "hf-workspace-primary-loader",
  templateUrl: "./primary-loader.component.html",
  styleUrls: ["./primary-loader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class PrimaryLoaderComponent {
  @Input() loading?: boolean | null = false;

  isLoading: boolean;

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
  ) {
    this.isLoading = this.loaderService?.getLoading();
    this.cdr.markForCheck();
    console.log("this.isLoading", this.isLoading);
  }
}
