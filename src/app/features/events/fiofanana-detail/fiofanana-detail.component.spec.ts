import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiofananaDetailComponent } from './fiofanana-detail.component';

describe('FiofananaDetailComponent', () => {
  let component: FiofananaDetailComponent;
  let fixture: ComponentFixture<FiofananaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiofananaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiofananaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
