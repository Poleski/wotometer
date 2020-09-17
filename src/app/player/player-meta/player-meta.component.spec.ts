import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMetaComponent } from './player-meta.component';

describe('PlayerMetaComponent', () => {
  let component: PlayerMetaComponent;
  let fixture: ComponentFixture<PlayerMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
