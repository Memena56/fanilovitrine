import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';

interface Card {
  image: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-traikefa-mampitombo-talenta-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traikefa-mampitombo-talenta-detail.component.html',
  styleUrls: ['./traikefa-mampitombo-talenta-detail.component.css']
})

export class TraikefaMampitomboTalentaDetailComponent {
  showAll = false;
  expandedIndexes = new Set<number>();
  introduction = '';
  title = '';
  cards : Card[] = [];

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute
  ){}
  ngOnInit(){
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.eventService.getEvent(slug).subscribe(event => {
        this.title = event.title;
        this.introduction = event.introduction;
        if (typeof event.content === 'string') {
        try {
          this.cards = JSON.parse(event.content) as Card[];
        } catch (e) {
          console.error('Erreur parsing content JSON:', e);
          this.cards = [];
        }
        } else if (Array.isArray(event.content)) {
          this.cards = event.content as Card[];
        } else {
          this.cards = [];
        }
      });
    });

  }

  toggleReadMore(i: number) {
    this.expandedIndexes.has(i)
      ? this.expandedIndexes.delete(i)
      : this.expandedIndexes.add(i);
  }

  isExpanded(i: number): boolean {
    return this.expandedIndexes.has(i);
  }
}
