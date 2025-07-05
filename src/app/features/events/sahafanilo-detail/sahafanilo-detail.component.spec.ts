import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SahafaniloDetailComponent } from './sahafanilo-detail.component';

describe('SahafaniloDetailComponent', () => {
  let component: SahafaniloDetailComponent;
  let fixture: ComponentFixture<SahafaniloDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SahafaniloDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SahafaniloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
