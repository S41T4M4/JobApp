import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementJobsComponent } from './management-jobs.component';

describe('ManagementJobsComponent', () => {
  let component: ManagementJobsComponent;
  let fixture: ComponentFixture<ManagementJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
