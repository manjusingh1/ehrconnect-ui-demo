import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Observable } from "rxjs";
import { AbbottAppToEhrFormFields } from "./form-schema.ts/form-schema";
import {
  ChildDropdownValues,
  GetExportTableData,
} from "../../../models/home.models";

@Component({
  selector: "app-abbott-app-to-ehr-service-config",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: "./abbott-app-to-ehr-service-config.component.html",
  styleUrl: "./abbott-app-to-ehr-service-config.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbbottAppToEhrServiceConfigComponent {
  @Input() parentForm!: FormGroup;
  @Input() selectedAppInfo!: ChildDropdownValues[];
  @Input() isAbbottAppChange!: Observable<boolean>;
  @Input() receivingFacilityDDL!: ChildDropdownValues[];
  @Input() sendingAppDDL!: ChildDropdownValues[];
  @Input() receivingAppCodeDDLEdit!: ChildDropdownValues[];
  receivingFacilityCode!: string | null;
  @Input() middleWareDDLEdit!: ChildDropdownValues[];
  @Input() rowData!: GetExportTableData;
  @Input() type = "";
  fields = AbbottAppToEhrFormFields;
  jsonVersionDDL = [{ id: "1.0", value: "1.0" }];

  messageFormatDDL = [
    { id: "JSON", value: "JSON" },
    { id: "HL7", value: "HL7" },
    { id: "FHIR", value: "FHIR" },
  ];

  messageTypeDDL = [
    { id: "ORU^R01", value: "ORU^R01" },
    { id: "ADT^A08", value: "ADT^A08" },
    { id: "ADT^A04", value: "ADT^A04" },
    { id: "FHIR", value: "FHIR" },
  ];

  constructor() {}

  ngOnInit(): void {
    this.isAbbottAppChange.subscribe((res: boolean) => {
      if (res) {
        this.onReceivingFacilityChange(this.rowData.receivingFacilityCode);
        this.parentForm.patchValue({
          sendingApp: this.rowData.sendingAppCode,
          receivingFacility:
            this.type == "export"
              ? this.rowData?.receivingFacilityCode
              : "ABCFACILITY",
          receivingApp: this.rowData?.receivingAppCode,
          mwId: this.rowData?.mwId?.toString(),
          jsonVersion: "1.0",
          messageFormat: this.rowData.messageFormat,
          messageType: this.rowData.messageType,
        });
        this.receivingFacilityDDL = [];
        this.receivingAppCodeDDLEdit = [];
        this.middleWareDDLEdit = [];
      }
    });
    this.middleWareDDLEdit = this.selectedAppInfo;
    const selectedReveivingFacility = this.selectedAppInfo?.find(
      (c) => c.reveivingFacility === this.rowData.receivingFacility,
    );
    if (selectedReveivingFacility) {
      this.parentForm.patchValue({
        receivingFacility: selectedReveivingFacility.reveivingFacilityCode,
      });
    }

    const selectedReceivingApp = this.receivingAppCodeDDLEdit?.find(
      (c) => c.recevingApp === this.rowData.receivingApp,
    );
    if (selectedReceivingApp) {
      this.parentForm.patchValue({
        receivingApp: selectedReceivingApp.reveivingAppCode,
      });
    }

    const selectedMiddleware = this.middleWareDDLEdit?.find(
      (c) => c.middleWareName === this.rowData.mwId,
    );
    if (selectedMiddleware) {
      this.parentForm.patchValue({
        mwId: selectedMiddleware.middleWareCode,
      });
    }
  }

  onReceivingFacilityChange(value: string | null) {
    this.receivingFacilityCode = value;
    console.log("this.selectedAppInfo", this.selectedAppInfo);
    this.receivingAppCodeDDLEdit = [];
    this.receivingAppCodeDDLEdit = this.selectedAppInfo?.filter(
      (res: ChildDropdownValues) => res.reveivingFacilityCode === value,
    );
  }

  onReceivingApplicationChange(value: string) {
    this.middleWareDDLEdit = [];
    this.middleWareDDLEdit = this.selectedAppInfo.filter(
      (res: ChildDropdownValues) =>
        res.reveivingAppCode === value &&
        res.reveivingFacilityCode === this.receivingFacilityCode,
    );
    this.middleWareDDLEdit = this.middleWareDDLEdit.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.middleWareCode === item.middleWareCode),
    );
  }

  onMiddlewareChange(value: number) {}
}
