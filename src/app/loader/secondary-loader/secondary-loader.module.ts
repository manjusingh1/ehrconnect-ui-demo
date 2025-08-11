import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SecondaryLoaderComponent } from "./secondary-loader.component";
export { SecondaryLoaderComponent } from "./secondary-loader.component";
@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [SecondaryLoaderComponent],
  exports: [SecondaryLoaderComponent],
})
export class SecondaryLoaderModule {}
