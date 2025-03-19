import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEventButtonComponent } from './delete-event-button.component';

describe('DeleteEventButtonComponent', () => {
  let component: DeleteEventButtonComponent;
  let fixture: ComponentFixture<DeleteEventButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEventButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
