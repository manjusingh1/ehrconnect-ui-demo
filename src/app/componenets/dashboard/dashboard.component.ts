import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject } from "rxjs";
import { BarChartComponent } from "../../charts/bar-chart/bar-chart.component";
// import { ChartSampleComponent } from "../../charts/chart-sample/chart-sample.component";
import { LineChartComponent } from "../../charts/line-chart/line-chart.component";
import { PieChartComponent } from "../../charts/pie-chart/pie-chart.component";
import { UserProfiles } from "../../models/user-profile.model";
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { BamListComponent } from "./bam-list/bam-list.component";
import { BamListDialogComponent } from "../../shared/components/bam-list-dialog/bam-list-dialog.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    BarChartComponent,
    MatTooltipModule,
    MatBadgeModule,
    LineChartComponent,
    MatTableModule,
    MatButtonModule,
    PieChartComponent,
    MatTabsModule,
    MatPaginatorModule,
    // ChartSampleComponent,
    BamListComponent,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  #destroyMemory$: Subject<void>;
  receivedMessages: string[] = [];

  userProfile!: UserProfiles;

  constructor(public dialog: MatDialog) {
    this.#destroyMemory$ = new Subject<void>();
  }

  ngOnInit(): void {}

  onAddButtonClick(): void {
    this.dialog.open(BamListDialogComponent, {
      data: {},
      panelClass: "custom-dialog-height",
    });
  }

  ngOnDestroy() {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
