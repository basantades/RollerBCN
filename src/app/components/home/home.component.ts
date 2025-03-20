import { Component, OnInit } from '@angular/core';
import { EventsPreviewComponent } from "./events-preview/events-preview.component";
import { EventsService } from '../../services/events.service';
import { WelcomeComponent } from "./welcome/welcome.component";

@Component({
  selector: 'app-home',
  imports: [EventsPreviewComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.eventsService.loadEvents();
  }
}