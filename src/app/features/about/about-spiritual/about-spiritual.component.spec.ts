import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSpiritualComponent } from './about-spiritual.component';

describe('AboutSpiritualComponent', () => {
  let component: AboutSpiritualComponent;
  let fixture: ComponentFixture<AboutSpiritualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSpiritualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSpiritualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
