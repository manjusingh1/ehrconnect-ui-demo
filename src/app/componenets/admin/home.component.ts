import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EMPTY, Subject, catchError, takeUntil, tap } from "rxjs";
import { AppMsalService } from "../../app-msal.service";
import { UserProfiles } from "../../models/user-profile.model";
import { DataService } from "../../service/data.service";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { WorkInProgressComponent } from "../../shared/components/work-in-progress/work-in-progress.component";
import { GetData, GetExportTableData } from "../../models/home.models";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    WorkInProgressComponent,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    HeaderComponent,
    MatInputModule,
    CommonModule,
    MatSortModule,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  #destroyMemory$: Subject<void>;
  navTitle = "< Back";
  userProfile: UserProfiles;
  confirmTitle: string = "Delete Item";
  confirmMessage: string = "Are you sure you want to delete this item?";

  columns = [
    {
      columnDef: "sendingFacility",
      header: "Sending Facility",
      cell: (element: GetExportTableData) =>
        element.type === "Import"
          ? `${element.sendingFacilityName}`
          : `${element.sendingFacility}`,
    },
    {
      columnDef: "sendingApplication",
      header: "Sending Application",
      cell: (element: GetExportTableData) => `${element.sendingApp}`,
    },
    {
      columnDef: "receivingFacility",
      header: "Receiving Facility",
      cell: (element: GetExportTableData) =>
        element.type === "Import"
          ? `${element.receivingFacilityName}`
          : `${element.receivingFacility}`,
    },
    {
      columnDef: "receivingApplication",
      header: "Receiving Application",
      cell: (element: GetExportTableData) => `${element.receivingApp}`,
    },
    {
      columnDef: "middlewareName",
      header: "Middleware Name",
      cell: (element: GetExportTableData) => `${element.middleWareName}`,
    },
    {
      columnDef: "type",
      header: "Type",
      cell: (element: GetExportTableData) => `${element.type}`,
    },
  ];

  dataSource = new MatTableDataSource<GetExportTableData>([]);
  displayedColumns = [...this.columns.map((c) => c.columnDef), "actions"]; // Add 'actions' column

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog,
    private appMsalService: AppMsalService,
    private toastr: ToastrService,
  ) {
    this.#destroyMemory$ = new Subject<void>();
    this.userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;
  }

  ngOnInit(): void {
    this.dataService.getData();
    this.dataService.data$
      .pipe(
        tap((response) => {
          this.dataSource = new MatTableDataSource(response);
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
          this.dialog.closeAll();
        }),
        takeUntil(this.#destroyMemory$),
      )
      .subscribe();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row: any) {}

  onDelete(row: GetExportTableData) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete Item",
        message:
          row.type == "Export"
            ? `Are you sure you want to delete this ${row.receivingFacility} item?`
            : `Are you sure you want to delete this ${row.sendingFacilityName} item?`,
      },
      disableClose: true,
    });

    const updatedRow = { ...row, isDeleted: true, id: row.id };

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.dataService
        .deleteTableData(row.id, updatedRow)
        .pipe(
          tap((response) => {
            this.showSuccess();
            this.dataService.getData();
            console.log("res", response);
          }),
          catchError((error) => {
            console.log("err", error);
            return EMPTY;
          }),
          takeUntil(this.#destroyMemory$),
        )
        .subscribe();
      console.log("Item deleted");
      dialogRef.close();
    });

    dialogRef.componentInstance.onCancel.subscribe(() => {
      console.log("Delete action canceled");
      dialogRef.close();
    });
  }

  showSuccess() {
    this.toastr.success("The record has been deleted successfully", "Delete");
  }

  onEditButtonClick(rowData: GetData): void {
    this.dialog.open(DialogComponent, {
      data: { data: rowData, type: "Edit" },
      disableClose: true,
    });
  }

  onAddButtonClick(): void {
    this.dialog.open(DialogComponent, {
      data: { data: [], type: "Add" },
      disableClose: true,
    });
  }

  handleConfirm() {
    console.log("Confirmed!");
  }

  handleCancel() {
    console.log("Cancelled!");
  }

  onBackButtonClick(): void {
    this.router.navigate(["home", ""]);
  }

  logOutEmitter(event: boolean) {
    if (event) {
      this.logout();
    }
  }

  logout(): void {
    this.appMsalService.logoutUser();
    history.pushState(null, "");
    window.localStorage.clear();
  }

  ngOnDestroy(): void {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
