import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BamListComponent } from "./bam-list.component";

describe("BamListComponent", () => {
  let component: BamListComponent;
  let fixture: ComponentFixture<BamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BamListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
