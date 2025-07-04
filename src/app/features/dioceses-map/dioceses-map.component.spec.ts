import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiocesesMapComponent } from './dioceses-map.component';

describe('DiocesesMapComponent', () => {
  let component: DiocesesMapComponent;
  let fixture: ComponentFixture<DiocesesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiocesesMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiocesesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
