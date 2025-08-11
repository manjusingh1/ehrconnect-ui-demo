import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-my-profile",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: "./my-profile.component.html",
  styleUrl: "./my-profile.component.scss",
})
export class MyProfileComponent {
  user = {
    name: "HF Support",
    email: "hfsupport@example.com",
    username: "hfsupportuser",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    profilePic: "profile.jpg", // Add profile picture URL
  };

  constructor() {}

  ngOnInit(): void {}
}
