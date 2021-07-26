import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionEventMessageInfoComponent } from './discussion-event-message-info.component';

describe('DiscussionEventMessageInfoComponent', () => {
  let component: DiscussionEventMessageInfoComponent;
  let fixture: ComponentFixture<DiscussionEventMessageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionEventMessageInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionEventMessageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
