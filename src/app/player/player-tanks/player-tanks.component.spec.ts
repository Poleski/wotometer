import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTanksComponent } from './player-tanks.component';

describe('PlayerTanksComponent', () => {
  let component: PlayerTanksComponent;
  let fixture: ComponentFixture<PlayerTanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
