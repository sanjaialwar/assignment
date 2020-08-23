import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBrowseComponent } from './app-browse.component';

describe('AppBrowseComponent', () => {
  let component: AppBrowseComponent;
  let fixture: ComponentFixture<AppBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
