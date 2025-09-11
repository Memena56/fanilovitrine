import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStructureComponent } from './about-structure.component';

describe('AboutStructureComponent', () => {
  let component: AboutStructureComponent;
  let fixture: ComponentFixture<AboutStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
