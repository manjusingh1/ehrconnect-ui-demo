import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ChartService } from "../../../service/chart.service";
import { catchError, EMPTY, Subject, switchMap, takeUntil, tap } from "rxjs";
import {
  ClinicConfigGetData,
  ClinicConfigGetResponse,
  ErrorResponse,
} from "../../../models/chart.model";
import { ToastrService } from "ngx-toastr";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-clinic-config",
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: "./clinic-config.component.html",
  styleUrls: ["./clinic-config.component.scss"],
})
export class ClinicConfigComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  #destroyMemory$: Subject<void>;
  clinicConfigData: ClinicConfigGetData[] = [];
  selectAllChecked = false;

  constructor(
    private fb: FormBuilder,
    private chartService: ChartService,
    private toastr: ToastrService,
  ) {
    this.#destroyMemory$ = new Subject<void>();
  }

  ngOnInit() {
    this.initialClinicConfigCall();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  initialClinicConfigCall(): void {
    this.chartService
      .initialClinicConfigCall()
      .pipe(
        tap((response) => {
          console.log("Initial clinic config call success", response);
        }),
        switchMap(() => this.chartService.getClinicConfig()),
        tap((response: ClinicConfigGetResponse) => {
          this.clinicConfigData = response.data;
          this.setFormArray();
          this.updateSelectAllState();
          console.log("Clinic config data", response);
        }),
        catchError((error) => {
          console.log("Error", error);
          return EMPTY;
        }),
        takeUntil(this.#destroyMemory$),
      )
      .subscribe();
  }

  setFormArray() {
    const itemsArray = this.form.get("items") as FormArray;
    this.clinicConfigData.forEach((data) => {
      itemsArray.push(
        this.fb.group({
          customerName: data.customerName,
          isChecked: data.isChecked,
        }),
      );
    });
  }

  get items() {
    return this.form.get("items") as FormArray;
  }

  onSubmit() {
    const payload = this.clinicConfigData.map((data, index) => ({
      ...data,
      isChecked: this.items.at(index).value.isChecked,
      updatedBy: this.chartService.userProfile.name,
      userId: "admin",
      createdBy: "admin",
    }));

    this.chartService
      .putClinicConfig(payload)
      .pipe(
        tap((response) => {
          this.toastr.success(response.data, "Update");
          this.chartService.getClinicConfigData();
          console.log("res", response);
        }),
        catchError((error) => {
          const err: ErrorResponse = error.error;
          this.toastr.error(err.message, "Error");
          console.log("err", error);
          return EMPTY;
        }),
        takeUntil(this.#destroyMemory$),
      )
      .subscribe();
    console.log(this.form.value);
  }

  toggleSelectAll() {
    this.selectAllChecked = !this.selectAllChecked;
    this.items.controls.forEach((control) => {
      control.get("isChecked")?.setValue(this.selectAllChecked);
    });
  }

  updateSelectAllState() {
    this.selectAllChecked = this.items.controls.every(
      (control) => control.get("isChecked")?.value,
    );
  }

  ngOnDestroy() {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
