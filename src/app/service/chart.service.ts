import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError, EMPTY, Observable, BehaviorSubject } from "rxjs";
import {
  DashboardTableDataResponse,
  GetExportTableData,
} from "../models/home.models";
import {
  BarChartData,
  LineChartData,
  ChartDataCountResponse,
  PieChartData,
  ClinicConfigGetResponse,
  ClinicConfigPutResponse,
  ClinicConfigGetData,
  GetLineDataResponse,
} from "../models/chart.model";
import { UserProfiles } from "../models/user-profile.model";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  private apiUrl = "http://localhost:8052"; // Replace with your API URL

  public dataSource = new BehaviorSubject<any>(null);
  data$ = this.dataSource.asObservable();
  userProfile!: UserProfiles;
  appCode!: string;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    this.userProfile = window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
      : null;
    this.appCode = this.userProfile.extension_App;
  }

  getPieChartData(date: string): Observable<PieChartData[]> {
    return this.http.get<PieChartData[]>(
      `${this.apiUrl}/ehr-bam-intg?date=${date}&userappcode=${this.appCode}`,
    );
  }

  getPieChartDataCount(date: number): Observable<ChartDataCountResponse> {
    return this.http.get<ChartDataCountResponse>(
      `${this.apiUrl}/ehr-bam-intg/pie/counts?date=${date}&userappcode=${this.appCode}`,
    );
  }

  getLineChartData(days: number): Observable<GetLineDataResponse> {
    return this.http.get<GetLineDataResponse>(
      `${this.apiUrl}/ehr-bam-intg/line?userappcode=${this.appCode}&days=${days}`,
    );
  }

  getLineChartDataCount(): Observable<ChartDataCountResponse> {
    return this.http.get<ChartDataCountResponse>(
      `${this.apiUrl}/ehr-bam-intg/line/counts?userappcode=${this.appCode}`,
    );
  }

  getBarChartData(
    startDate: number,
    endDate: number,
  ): Observable<BarChartData[]> {
    return this.http.get<BarChartData[]>(
      `${this.apiUrl}/ehr-bam-intg/bar?begin=${startDate ?? 1737849600000}&end=${endDate ?? 1738065599000}&userappcode=${this.appCode}`,
    );
  }

  getBarChartDataCount(
    startDate: number,
    endDate: number,
  ): Observable<ChartDataCountResponse> {
    return this.http.get<ChartDataCountResponse>(
      `${this.apiUrl}/ehr-bam-intg/bar/counts?begin=${startDate ?? 1737849600000}&end=${endDate ?? 1738065599000}&userappcode=${this.appCode}`,
    );
  }

  getDashboardTableData(
    appCode: string,
  ): Observable<DashboardTableDataResponse> {
    return this.http.get<DashboardTableDataResponse>(
      `${this.apiUrl}/ehr-bam-intg/list?userappcode=${this.appCode}`,
    );
  }

  getClinicConfigData() {
    this.getClinicConfig()
      .pipe(
        tap((response) => {
          this.dataSource.next(response);
        }),
        catchError((error) => {
          this.toastr.error(error.error.errorMessage, "Error");
          return EMPTY;
        }),
      )
      .subscribe();
  }

  initialClinicConfigCall(): Observable<ClinicConfigGetResponse> {
    return this.http.get<ClinicConfigGetResponse>(
      `${this.apiUrl}/bam-clinic-config?userappcode=${this.appCode}&userid=admin`,
    );
  }

  getClinicConfig(): Observable<ClinicConfigGetResponse> {
    return this.http.get<ClinicConfigGetResponse>(
      `${this.apiUrl}/bam-clinic-config/list?userappcode=${this.appCode}`,
    );
  }

  putClinicConfig(data: ClinicConfigGetData[]) {
    return this.http.put<ClinicConfigPutResponse>(
      `${this.apiUrl}/bam-clinic-config?userappcode=${this.appCode}`,
      data,
    );
  }
}
