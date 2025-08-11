import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-ehr-service-to-middleware-config",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./ehr-service-to-middleware-config.component.html",
  styleUrl: "./ehr-service-to-middleware-config.component.scss",
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EhrServiceToMiddlewareConfigComponent {
  appConfigForm: FormGroup;
  @Input() parentForm!: FormGroup;
  @Input() type = "";

  constructor(private fb: FormBuilder) {
    this.appConfigForm = this.fb.group({
      authorizationUrl: ["", Validators.required],
      authClientId: ["", Validators.required],
      authSecret: ["", Validators.required],
      middlewareUrl: ["", Validators.required],
    });
  }

  ngOnInit(): void {}
}
