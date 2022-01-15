import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriosListComponent } from './laboratorios-list.component';

describe('LaboratoriosListComponent', () => {
  let component: LaboratoriosListComponent;
  let fixture: ComponentFixture<LaboratoriosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoriosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoriosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
