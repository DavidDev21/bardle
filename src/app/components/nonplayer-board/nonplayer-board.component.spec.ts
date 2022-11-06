import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonplayerBoardComponent } from './nonplayer-board.component';

describe('NonplayerBoardComponent', () => {
  let component: NonplayerBoardComponent;
  let fixture: ComponentFixture<NonplayerBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonplayerBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonplayerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
