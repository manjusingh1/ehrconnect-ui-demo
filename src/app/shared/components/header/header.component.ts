import { CommonModule, DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { UserProfiles } from "../../../models/user-profile.model";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() loginDisplay = false;
  @Input() userProfile!: UserProfiles;
  @Output() logOutEmitter = new EventEmitter();
  currentDate!: string;

  constructor(private router: Router) {}
  navigateToHome() {
    this.router.navigate(["/home"]);
  }

  logout(): void {
    this.logOutEmitter.emit(true);
  }
}
