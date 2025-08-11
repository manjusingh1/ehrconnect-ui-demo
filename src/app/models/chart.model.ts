export interface PieChartData {
  statusCount: number;
  category: string;
  color?: string;
  time?: string;
}

export interface LineChartData {
  statusCount: number;
  category: string;
  time: string;
}

export interface BarChartData {
  count: number;
  displayName: string;
  category: string;
}

export interface ChartDataCountResponse {
  success: string;
  httpStatusCode: number;
  msgCode: null;
  message: null;
  data: ChartDataCount[];
}

export interface ChartDataCount {
  date?: null;
  statusCode?: string;
  statusCount?: number;
  category?: string;
}

export interface WebSocketResponse {
  statusCount: number;
  category: string;
  time: string;
  counts: Count[];
}

export interface Count {
  category: string;
  statusCount: number;
}
export interface ClinicConfigPutResponse {
  success: string;
  httpStatusCode: number;
  msgCode: string | null;
  message: string | null;
  data: string;
}

export interface ClinicConfigGetResponse {
  success: string;
  httpStatusCode: number;
  msgCode: string | null;
  message: string | null;
  data: ClinicConfigGetData[];
}

export interface ClinicConfigGetData {
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isDeleted: boolean | null;
  comments: string | null;
  id: number;
  userId: string | number | null;
  customerCode: string;
  isChecked: boolean;
  customerName: string;
}

export interface ErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface GetLineDataResponse {
  appCode: string;
  liveStatus: LiveStatus[];
  counts: Count[];
}

export interface Count {
  category: string;
  statusCount: number;
}

export interface LiveStatus {
  clinicName: string;
  dateCount: DateCount[];
}

export interface DateCount {
  dateHourTime: number;
  count: number;
}

export interface AllData {
  category: string;
  time: number;
  statusCount: number;
}

export interface ChartDataOption {
  label: string;
  data: Datum[];
  tension: number;
  cubicInterpolationMode: string;
  capBezierPoints: boolean;
  borderColor: string;
  backgroundColor: string;
}

export interface Datum {
  x: number;
  y: number;
}
