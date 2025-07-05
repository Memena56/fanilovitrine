import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HetsikaIraisamPirenenaDetailComponent } from './hetsika-iraisam-pirenena-detail.component';

describe('HetsikaIraisamPirenenaDetailComponent', () => {
  let component: HetsikaIraisamPirenenaDetailComponent;
  let fixture: ComponentFixture<HetsikaIraisamPirenenaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HetsikaIraisamPirenenaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HetsikaIraisamPirenenaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
