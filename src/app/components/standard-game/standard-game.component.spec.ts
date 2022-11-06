import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGameComponent } from './standard-game.component';

describe('StandardGameComponent', () => {
  let component: StandardGameComponent;
  let fixture: ComponentFixture<StandardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
