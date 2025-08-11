import { CommonModule, DatePipe } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { catchError, EMPTY, Subject, takeUntil, tap } from "rxjs";
import { AppMsalService } from "../../../app-msal.service";
import { UserProfiles } from "../../../models/user-profile.model";
import { ChartService } from "../../../service/chart.service";
import { WorkInProgressComponent } from "../../../shared/components/work-in-progress/work-in-progress.component";
import { DashboardTableData, GetData } from "../../../models/home.models";

@Component({
  selector: "app-bam-list",
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatTooltipModule,
    MatBadgeModule,
    WorkInProgressComponent,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DatePipe],
  templateUrl: "./bam-list.component.html",
  styleUrl: "./bam-list.component.scss",
})
export class BamListComponent {
  dataSource = new MatTableDataSource<DashboardTableData>([]);
  @Input() pageSize!: number;
  @Input() isFromDialog = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  #destroyMemory$: Subject<void>;
  receivedMessages: string[] = [];
  filterValue = "";

  menuItems = [
    { icon: "home", text: "Home" },
    { icon: "dashboard", text: "Dashboard" },
    { icon: "bar_chart", text: "Analytics" },
    { icon: "settings", text: "Settings" },
    { icon: "help", text: "Help" },
  ];
  columns = [
    {
      columnDef: "clinicName",
      header: "Clinic Name",
      cell: (element: any) => `${element.clinicName}`,
    },
    {
      columnDef: "ehrName",
      header: "EHR Name",
      cell: (element: any) => `${element.ehrName}`,
    },
    {
      columnDef: "abbottAppName",
      header: "Abbott App Name",
      cell: (element: any) => `${element.abbottAppName}`,
    },
    {
      columnDef: "mwName",
      header: "Middleware Name",
      cell: (element: any) => `${element.mwName}`,
    },
    {
      columnDef: "type",
      header: "Type",
      cell: (element: any) => `${element.type}`,
    },
    {
      columnDef: "status",
      header: "Status",
      cell: (element: any) => `
        <button mat-button color="primary" (click)="changeStatus(element, 'Success')">Success</button>
        <button mat-button color="warn" (click)="changeStatus(element, 'Failure')">Failure</button>
        <button mat-button color="accent" (click)="changeStatus(element, 'In Progress')">In Progress</button>
      `,
    },
    {
      columnDef: "date",
      header: "Date",
      cell: (element: any) => this.formatDate(element.date),
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);
  userProfile!: UserProfiles;
  currentRoute: string = "";

  constructor(
    private appMsalService: AppMsalService,
    private datePipe: DatePipe,
    private chartService: ChartService,
  ) {
    this.#destroyMemory$ = new Subject<void>();
    this.userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;
  }
  trackByColumn(index: number, column: any): any {
    return column.columnDef;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue?.trim()?.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, "dd-MM-yyyy");
  }

  updateStatus(row: any, newStatus: string): void {
    // row.status = newStatus;
  }
  ngOnInit(): void {
    this.getDashboardTableData();
  }

  getDashboardTableData() {
    const extensionApp: string = this.userProfile.extension_App;
    this.chartService
      .getDashboardTableData(extensionApp)
      .pipe(
        tap((response) => {
          console.log("res", response);
          this.dataSource = new MatTableDataSource(response.data);
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
        }),
        catchError((error) => {
          console.log("err", error);
          return EMPTY;
        }),
        takeUntil(this.#destroyMemory$),
      )
      .subscribe();
  }

  getRecord(rowData: GetData): void {
    console.log("rowData", rowData);
  }
}
