import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCandidatoComponent } from './dashboard-candidato.component';

describe('DashboardCandidatoComponent', () => {
  let component: DashboardCandidatoComponent;
  let fixture: ComponentFixture<DashboardCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
