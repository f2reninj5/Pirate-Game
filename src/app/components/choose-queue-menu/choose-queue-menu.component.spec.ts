import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseQueueMenuComponent } from './choose-queue-menu.component';

describe('ChooseQueueMenuComponent', () => {
  let component: ChooseQueueMenuComponent;
  let fixture: ComponentFixture<ChooseQueueMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseQueueMenuComponent]
    });
    fixture = TestBed.createComponent(ChooseQueueMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
