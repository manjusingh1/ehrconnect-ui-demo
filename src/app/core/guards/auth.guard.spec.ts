import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("Logged in guard should", () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = <any>{};
  const mockRouterStateSnapshot: RouterStateSnapshot = <any>{};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthGuard],
    }).compileComponents();
  });

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
  });
});
