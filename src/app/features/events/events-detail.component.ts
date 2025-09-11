import { Component, ViewContainerRef, Injector, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Event } from '../events/events.service';

@Component({
  selector: 'app-events-detail',
  standalone: true,
  template: `<ng-template #container></ng-template>`,
  styles: []
})
export class EventsDetailComponent {
  private titleService = inject(Title);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const event = data['event'] as Event | undefined;
      if (event?.title) {
        this.titleService.setTitle(`${event.title} - Fanilon'I Madagasikara`);
      } else {
        this.titleService.setTitle('Fanilon\'I Madagasikara');
      }
    });

    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');
      if (!slug) {
        this.router.navigate(['/not-found']);
        return;
      }

      let componentToRender: any;

      switch (slug) {
        case 'fiofanana':
          componentToRender = (await import('../events/fiofanana-detail/fiofanana-detail.component')).FiofananaDetailComponent;
          break;
        case 'hetsika-iraisam-pirenena':
          componentToRender = (await import('../events/hetsika-iraisam-pirenena-detail/hetsika-iraisam-pirenena-detail.component')).HetsikaIraisamPirenenaDetailComponent;
          break;
        case 'lasy-sy-an-tsaha':
          componentToRender = (await import('../events/lasy-sy-antsaha-detail/lasy-sy-antsaha-detail.component')).LasySyAntsahaDetailComponent;
          break;
        case 'sahafanilo':
          componentToRender = (await import('../events/sahafanilo-detail/sahafanilo-detail.component')).SahafaniloDetailComponent;
          break;
        case 'traikefa-mampitombo-talenta':
          componentToRender = (await import('../events/traikefa-mampitombo-talenta-detail/traikefa-mampitombo-talenta-detail.component')).TraikefaMampitomboTalentaDetailComponent;
          break;
        default:
          this.router.navigate(['/not-found']);
          return;
      }

      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(componentToRender, {
        injector: this.injector,
      });
    });
  }
}
