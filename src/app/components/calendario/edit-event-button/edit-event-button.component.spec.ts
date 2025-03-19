import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventButtonComponent } from './edit-event-button.component';

describe('EditEventButtonComponent', () => {
  let component: EditEventButtonComponent;
  let fixture: ComponentFixture<EditEventButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEventButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
