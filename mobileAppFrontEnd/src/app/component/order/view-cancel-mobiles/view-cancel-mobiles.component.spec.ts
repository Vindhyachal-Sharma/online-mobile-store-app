import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCancelMobilesComponent } from './view-cancel-mobiles.component';

describe('ViewCancelMobilesComponent', () => {
  let component: ViewCancelMobilesComponent;
  let fixture: ComponentFixture<ViewCancelMobilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCancelMobilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCancelMobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
