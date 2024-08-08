import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosEmVagasComponent } from './candidatos-em-vagas.component';

describe('CandidatosEmVagasComponent', () => {
  let component: CandidatosEmVagasComponent;
  let fixture: ComponentFixture<CandidatosEmVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatosEmVagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatosEmVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
