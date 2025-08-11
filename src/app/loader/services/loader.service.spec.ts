// TODO :: Add unit tests here
import { TestBed } from "@angular/core/testing";
import { APIRoutes } from "../../../app-api-routes";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoaderService } from "./loader.service";

describe("LoaderService", () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIRoutes],
    });
    service = TestBed.inject(LoaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
