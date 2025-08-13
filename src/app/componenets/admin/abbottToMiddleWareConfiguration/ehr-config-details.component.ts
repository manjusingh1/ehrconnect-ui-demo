import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, Observable, of, Subject } from "rxjs";
import { AbbottAppToEhrServiceConfigComponent } from "../abbott-app-to-ehr-service-config/abbott-app-to-ehr-service-config.component";
import { AbbottAppToEhrFormFields } from "../abbott-app-to-ehr-service-config/form-schema.ts/form-schema";
import {
  GetExportTableData,
  ChildDropdownValues,
  GetAbbottApp,
} from "../../../models/home.models";
import { UserProfiles } from "../../../models/user-profile.model";
import { DataService } from "../../../service/data.service";
import { EhrServiceToMiddlewareConfigComponent } from "../ehr-service-to-middleware-config/ehr-service-to-middleware-config.component";

@Component({
  selector: "app-ehr-config-details",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    AbbottAppToEhrServiceConfigComponent,
    EhrServiceToMiddlewareConfigComponent,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: "./ehr-config-details.component.html",
  styleUrl: "./ehr-config-details.component.scss",
})
export class EhrConfigDetailsComponent implements OnDestroy, OnInit {
  selectedValue: string = "";
  selectedCar: string = "";
  @Input() rowData!: { data: GetExportTableData; type: string };
  @Input() type = "";
  parentForm!: FormGroup;

  appConfigForm!: FormGroup;
  fields = AbbottAppToEhrFormFields;
  selectedAppInfo!: ChildDropdownValues[];
  receivingFacility!: ChildDropdownValues[];
  receivingAppCode!: ChildDropdownValues[];
  middleWare!: ChildDropdownValues[];
  #destroyMemory$: Subject<void>;

  isAbbottAppChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  isAbbottAppChange$: Observable<boolean> =
    this.isAbbottAppChanged.asObservable();
  data!: GetExportTableData;
  getAbbottApp: GetAbbottApp[] = [];
  selectedTabIndex = 0;

  interrogatorId: string | null = null;
  userProfile!: UserProfiles;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
  ) {
    this.#destroyMemory$ = new Subject<void>();
    this.userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;
  }

  ngOnInit() {
    this.getAbbottAppDDLValue();
    this.parentForm = this.fb.group({});
    this.data = this.rowData.data;
    this.initializeForm();
    this.patchForm();

    if (this.rowData.type == "Edit") {
      this.onAbbottAppChange(this.data.abbotAppId as number);
    }

    if (this.rowData.type == "Edit" && this.data.type == "Import") {
      this.onTabChange((this.selectedTabIndex = 1));
    }
  }

  initializeForm(): void {
    this.appConfigForm = this.fb.group({
      abbotAppId: ["", Validators.required],
      id: [""],
      updatedBy: [""],
      createdBy: [""],
      type: [""],
      abbottAppToEhrServiceConfig: this.fb.group({
        sendingFacility: [
          { value: "ABCFACILITY", disabled: true },
          Validators.required,
        ],
        sendingApp: [{ value: "", disabled: true }, Validators.required],
        sendingAppCode: [""],
        receivingAppCode: [""],
        receivingFacility: ["", Validators.required],
        receivingApp: ["", Validators.required],
        mwId: ["", Validators.required],
        receiverOauthUrl: ["", Validators.required],
        jsonVersion: ["1.0"],
        messageType: [""],
        messageFormat: [""],
      }),
      ehrServiceToMiddlewareConfig: this.fb.group({
        senderVerificationUrl: ["", Validators.required],
        senderClientId: ["", Validators.required],
        receiverUrl: ["", Validators.required],
        senderSecret: ["", Validators.required],
      }),
    });
  }

  patchForm(): void {
    if (this.data) {
      this.appConfigForm.patchValue({
        abbotAppId: this.data.abbotAppId,
        id: this.data.id,
        updatedBy: this.rowData.type === "Edit" ? this.userProfile.name : "",
        createdBy: this.rowData.type === "Add" ? this.userProfile.name : "",
        type: "Export",
      });

      this.appConfigForm.get("abbottAppToEhrServiceConfig")?.patchValue({
        receiverOauthUrl: this.data.receiverOauthUrl,
        sendingFacility: this.data.sendingFacility || "ABCFACILITY",
        sendingApp: this.data.sendingApp,
        sendingAppCode: this.data.sendingAppCode,
        receivingAppCode: this.data.receivingAppCode,
        receivingFacility: this.data.receivingFacility,
        receivingApp: this.data.receivingApp,
        mwId: this.data.mwId,
      });

      this.appConfigForm.get("ehrServiceToMiddlewareConfig")?.patchValue({
        senderVerificationUrl: this.data.senderVerificationUrl,
        authClientId: this.data.receiverClientId,
        authSecret: this.data.receiverSecret,
        receiverUrl: this.data.receiverUrl,
        senderClientId: this.data.senderClientId,
        senderSecret: this.data.senderSecret,
      });
    }
  }

  onTabChange(index: number): void {
    if (this.rowData.type !== "Edit") {
      this.resetForm();
    }
    this.selectedTabIndex = index;

    const configControls = {
      sendingFacility: this.appConfigForm.get(
        "abbottAppToEhrServiceConfig.sendingFacility",
      ),
      sendingApp: this.appConfigForm.get(
        "abbottAppToEhrServiceConfig.sendingApp",
      ),
      receivingFacility: this.appConfigForm.get(
        "abbottAppToEhrServiceConfig.receivingFacility",
      ),
      receivingApp: this.appConfigForm.get(
        "abbottAppToEhrServiceConfig.receivingApp",
      ),
      receiverOauthUrl: this.appConfigForm.get(
        "abbottAppToEhrServiceConfig.receiverOauthUrl",
      ),
      receiverUrl: this.appConfigForm.get(
        "ehrServiceToMiddlewareConfig.receiverUrl",
      ),
      senderVerificationUrl: this.appConfigForm.get(
        "ehrServiceToMiddlewareConfig.senderVerificationUrl",
      ),
    };

    if (this.selectedTabIndex === 1) {
      configControls.sendingFacility?.enable();
      configControls.sendingApp?.enable();
      configControls.receivingFacility?.disable();
      configControls.receivingFacility?.setValue("ABCFACILITY");
      configControls.receivingApp?.disable();

      // Clear validators for URLs
      ["receiverOauthUrl", "receiverUrl", "senderVerificationUrl"].forEach(
        (key) => {
          configControls[key as keyof typeof configControls]?.clearValidators();
        },
      );
    } else if (this.selectedTabIndex === 0) {
      configControls.sendingFacility?.setValue("ABCFACILITY");
      configControls.sendingFacility?.disable();
      configControls.sendingApp?.disable();
      configControls.receivingFacility?.enable();
      configControls.receivingApp?.enable();
    }

    // Update validity for URLs
    ["receiverOauthUrl", "receiverUrl", "senderVerificationUrl"].forEach(
      (key) => {
        configControls[
          key as keyof typeof configControls
        ]?.updateValueAndValidity();
      },
    );
  }

  resetForm(): void {
    this.appConfigForm.reset();
  }

  getAbbottAppDDLValue() {
    this.dataService.getAbbottApp().subscribe((response: GetAbbottApp[]) => {
      this.getAbbottApp = response;
    });
  }

  get abbottAppToEhrServiceConfig(): FormGroup {
    return this.appConfigForm.get("abbottAppToEhrServiceConfig") as FormGroup;
  }

  get ehrServiceToMiddlewareConfig(): FormGroup {
    return this.appConfigForm.get("ehrServiceToMiddlewareConfig") as FormGroup;
  }

  onAbbottAppChange(value: number): void {
    this.dataService
      .getAbbottAppById(value)
      .subscribe((response: ChildDropdownValues[]) => {
        if (response) {
          this.selectedAppInfo = response;
          this.isAbbottAppChanged.next(true);
        }

        const selectedApp = this.getAbbottApp.find((x) => x.id === value);
        const selectedAppDisplayName =
          selectedApp?.displayName ||
          (this.selectedTabIndex === 0
            ? this.rowData.data.sendingApp
            : this.rowData.data.receivingApp);

        if (this.selectedTabIndex === 0 || this.selectedTabIndex === 1) {
          this.appConfigForm.get("abbottAppToEhrServiceConfig")?.patchValue({
            [this.selectedTabIndex === 0 ? "sendingApp" : "receivingApp"]:
              selectedAppDisplayName,
          });
        }

        this.receivingFacility = this.getUniqueValues(
          this.selectedAppInfo,
          "reveivingFacilityCode",
        );

        if (this.rowData.type === "Edit") {
          this.receivingAppCode = this.getUniqueValues(
            this.selectedAppInfo,
            "reveivingAppCode",
          );
          this.middleWare = this.getUniqueValues(
            this.selectedAppInfo,
            "middleWareCode",
          );
        }
      });
  }

  private getUniqueValues<T>(array: T[], key: keyof T): T[] {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key]),
    );
  }

  onSave(type: string): void {
    if (!this.appConfigForm.valid) return;

    const abbottConfig = this.appConfigForm
      .get("abbottAppToEhrServiceConfig")
      ?.getRawValue();
    const middlewareConfig = this.appConfigForm
      .get("ehrServiceToMiddlewareConfig")
      ?.getRawValue();

    const sendingAppAlias = abbottConfig?.sendingApp;
    const receivingAppAlias = abbottConfig?.receivingApp;
    const sendingFacility = abbottConfig?.sendingFacility || "ABCFACILITY";
    const receivingFacility = abbottConfig?.receivingFacility || "ABCFACILITY";

    const getAppAlias = (alias: string) =>
      this.getAbbottApp.find((x) => x.displayName === alias)?.aliasName;

    const payload = {
      ...this.appConfigForm.value,
      ...abbottConfig,
      ...middlewareConfig,
      sendingFacility,
      receivingFacility,
      receivingApp: receivingAppAlias,
      sendingApp: sendingAppAlias,
      type: type === "export" ? "Export" : "Import",
      sendingAppCode: getAppAlias(sendingAppAlias),
      receivingAppCode: getAppAlias(receivingAppAlias),
    };

    if (this.rowData.type !== "Edit") {
      delete payload.id;
    }

    delete payload.abbottAppToEhrServiceConfig;
    delete payload.ehrServiceToMiddlewareConfig;

    this.dataService
      .postData(payload)
      .pipe(
        catchError((error) => {
          console.error("Error occurred:", error);
          this.toastr.error(error.error.errorMessage, "Error");
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response) {
          this.dataService.getData();
          this.showSuccess();
        }
      });
  }

  showSuccess() {
    this.rowData.type === "Edit"
      ? this.toastr.success(
          "The record has been updated successfully",
          "Update",
        )
      : this.toastr.success("The record has been added successfully", "Add");
  }

  ngOnDestroy(): void {
    this.#destroyMemory$.next();
    this.#destroyMemory$.complete();
  }
}
