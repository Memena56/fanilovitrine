import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDiocesesComponent } from './about-dioceses.component';

describe('AboutDiocesesComponent', () => {
  let component: AboutDiocesesComponent;
  let fixture: ComponentFixture<AboutDiocesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDiocesesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDiocesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
