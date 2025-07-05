import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraikefaMampitomboTalentaDetailComponent } from './traikefa-mampitombo-talenta-detail.component';

describe('TraikefaMampitomboTalentaDetailComponent', () => {
  let component: TraikefaMampitomboTalentaDetailComponent;
  let fixture: ComponentFixture<TraikefaMampitomboTalentaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraikefaMampitomboTalentaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraikefaMampitomboTalentaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
