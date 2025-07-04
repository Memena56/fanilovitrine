import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAccordeonComponent } from './category-accordeon.component';

describe('CategoryAccordeonComponent', () => {
  let component: CategoryAccordeonComponent;
  let fixture: ComponentFixture<CategoryAccordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAccordeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAccordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
