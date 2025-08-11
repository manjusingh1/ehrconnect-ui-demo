import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket!: WebSocket;
  private subject = new Subject<any>();

  constructor() {
    this.connect();
    setInterval(() => {
      this.subject.next({
        time: new Date().toISOString(),
        category: "Test " + Math.floor(Math.random() * 3),
        statusCount: Math.floor(Math.random() * 100),
      });
    }, 2000); // Simulate new data every 2 seconds
  }

  private connect() {
    this.socket = new WebSocket("ws://localhost:8090");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.subject.next(data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(() => this.connect(), 3000);
    };
  }

  getLiveData(): Observable<any> {
    return this.subject.asObservable();
  }
}
