import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BamListDialogComponent } from "./bam-list-dialog.component";

describe("BamListDialogComponent", () => {
  let component: BamListDialogComponent;
  let fixture: ComponentFixture<BamListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BamListDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BamListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
