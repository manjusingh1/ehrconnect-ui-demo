// TODO :: Add UTs for corresponding class
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserProfileService } from "./user-profile.service";
import { ApiCallService } from "./api-call.service";
// import { APIRoutes } from '../app-api-routes';

describe("UserProfileService", () => {
  let service: UserProfileService;
  let httpTestingController: HttpTestingController;
  // let apiService: ApiCallService;
  // let apiRoutes: APIRoutes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [{ provide: TranslateService }, ApiCallService, APIRoutes],
    });
    service = TestBed.inject(UserProfileService);
    // apiService = TestBed.inject(ApiCallService);
    // apiRoutes = TestBed.inject(APIRoutes);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
