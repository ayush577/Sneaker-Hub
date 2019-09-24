import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprofilePage } from './eprofile.page';

describe('EprofilePage', () => {
  let component: EprofilePage;
  let fixture: ComponentFixture<EprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
