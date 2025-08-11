import { Component } from "@angular/core";
import { BamListComponent } from "../../../componenets/dashboard/bam-list/bam-list.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-bam-list-dialog",
  standalone: true,
  imports: [BamListComponent, MatIconModule, MatButtonModule],
  templateUrl: "./bam-list-dialog.component.html",
  styleUrl: "./bam-list-dialog.component.scss",
})
export class BamListDialogComponent {}
