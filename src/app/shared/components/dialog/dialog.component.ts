import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { EhrConfigDetailsComponent } from "../../../componenets/admin/abbottToMiddleWareConfiguration/ehr-config-details.component";

@Component({
  selector: "app-dialog",
  standalone: true,
  imports: [CommonModule, EhrConfigDetailsComponent, MatTabsModule],
  templateUrl: "./dialog.component.html",
  styleUrl: "./dialog.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data", data);
  }

  ngOnInit(): void {
    // console.log('Received data:', this.rowData);
  }
}
