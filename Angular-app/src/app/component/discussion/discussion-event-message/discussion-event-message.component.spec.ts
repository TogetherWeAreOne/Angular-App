import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionEventMessageComponent } from './discussion-event-message.component';

describe('DiscussionEventMessageComponent', () => {
  let component: DiscussionEventMessageComponent;
  let fixture: ComponentFixture<DiscussionEventMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionEventMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionEventMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
