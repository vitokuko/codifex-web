import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodifierComponent } from './codifier.component';

describe('CodifierComponent', () => {
  let component: CodifierComponent;
  let fixture: ComponentFixture<CodifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
