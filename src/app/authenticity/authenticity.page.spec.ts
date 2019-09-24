import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticityPage } from './authenticity.page';

describe('AuthenticityPage', () => {
  let component: AuthenticityPage;
  let fixture: ComponentFixture<AuthenticityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
