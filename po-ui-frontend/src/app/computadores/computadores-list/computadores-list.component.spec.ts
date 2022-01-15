import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputadoresListComponent } from './computadores-list.component';

describe('ComputadoresListComponent', () => {
  let component: ComputadoresListComponent;
  let fixture: ComponentFixture<ComputadoresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputadoresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputadoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
