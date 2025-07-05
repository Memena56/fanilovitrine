import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasySyAntsahaDetailComponent } from './lasy-sy-antsaha-detail.component';

describe('LasySyAntsahaDetailComponent', () => {
  let component: LasySyAntsahaDetailComponent;
  let fixture: ComponentFixture<LasySyAntsahaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LasySyAntsahaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LasySyAntsahaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
