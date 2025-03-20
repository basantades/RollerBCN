import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollToEvents() {
    const el = this.document.getElementById('events-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
