import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from "rxjs";
import {
  ChildDropdownValues,
  DashboardTableDataResponse,
  GetAbbottApp,
  GetData,
  GetExportData,
  GetExportTableData,
} from "../models/home.models";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiUrl = "http://localhost:8051"; // Replace with your API URL

  public dataSource = new BehaviorSubject<any>(null);
  data$ = this.dataSource.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getData() {
    this.getData1()
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

  getData1(): Observable<GetExportTableData[]> {
    return this.http.get<GetExportTableData[]>(`${this.apiUrl}/export`);
  }

  getAbbottApp(): Observable<GetAbbottApp[]> {
    return this.http.get<GetAbbottApp[]>(
      `${this.apiUrl}/ehrconnect-master/abbottApp`,
    );
  }

  deleteTableData(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/export/${id}`, data);
  }

  getAbbottAppById(id: number): Observable<ChildDropdownValues[]> {
    return this.http.get<ChildDropdownValues[]>(
      `${this.apiUrl}/ehrconnect-master/abbottApp/${id}`,
    );
  }

  postData = (payload: GetData): Observable<GetData> =>
    this.http.post<GetData>(`${this.apiUrl}/export`, { ...payload });

  receiveFromApp(value: string, payload: object): Observable<any> {
    const headers = new HttpHeaders().set("Custom-Auth", "True");
    return this.http.post<any>(
      `http://localhost:8050/common-connector/receive-from-app?abbottApp=${value}`,
      payload,
      { headers },
    );
  }

  tokenAbbottAppId = (value: number): Observable<any> => {
    const headers = new HttpHeaders().set("No-Auth", "True");
    return this.http.get<any>(
      `${"http://localhost:8050"}/token?abbottAppId=${value}`,
      { headers },
    );
  };
}
