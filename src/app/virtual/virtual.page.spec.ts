import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualPage } from './virtual.page';

describe('VirtualPage', () => {
  let component: VirtualPage;
  let fixture: ComponentFixture<VirtualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
