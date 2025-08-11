import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "../../loader/services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<unknown>[] = [];
  constructor(private loaderService: LoaderService) {}
  removeRequest(req: HttpRequest<unknown>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.setLoading(true);
    this.requests.push(req);
    return new Observable((observer) => {
      this.loaderService.setLoading(false);
      const subscription = next.handle(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        error: (err) => {
          this.loaderService.setLoading(false);
          this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          this.loaderService.setLoading(false);
          this.removeRequest(req);
          observer.complete();
        },
      });
      // remove request from queue when cancelled
      return () => {
        this.loaderService.setLoading(false);
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
