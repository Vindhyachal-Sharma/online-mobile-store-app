import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileToCategoryComponent } from './add-mobile-to-category.component';

describe('AddMobileToCategoryComponent', () => {
  let component: AddMobileToCategoryComponent;
  let fixture: ComponentFixture<AddMobileToCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMobileToCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMobileToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
