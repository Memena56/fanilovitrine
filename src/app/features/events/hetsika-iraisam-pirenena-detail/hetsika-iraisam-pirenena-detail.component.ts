import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';

interface Card {
  image: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-hetsika-iraisam-pirenena-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hetsika-iraisam-pirenena-detail.component.html',
  styleUrl: './hetsika-iraisam-pirenena-detail.component.css'
})
export class HetsikaIraisamPirenenaDetailComponent implements OnInit, AfterViewInit {
  introduction = '';
  title = '';
  cards: Card[] = [];
  expandedIndexes = new Set<number>();
  showReadMore: boolean[] = [];

  @ViewChildren('contentRef') contentRefs!: QueryList<ElementRef>;

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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

        // reset showReadMore (important si navigation dynamique)
        setTimeout(() => this.evaluateReadMore(), 0);
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.evaluateReadMore(), 0);
  }

  evaluateReadMore() {
    this.showReadMore = this.contentRefs.map(ref => {
      const el = ref.nativeElement;
      return el.scrollHeight > el.clientHeight;
    });
  }

  toggleExpanded(i: number): void {
    this.isExpanded(i) ? this.expandedIndexes.delete(i) : this.expandedIndexes.add(i);
  }

  isExpanded(i: number): boolean {
    return this.expandedIndexes.has(i);
  }
}
