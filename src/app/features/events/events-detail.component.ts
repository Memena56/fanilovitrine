import { Component, OnInit, ViewContainerRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
selector: 'app-events-detail',
imports: [],
standalone: true,
template: `<ng-template #container></ng-template>`,
styles: []
})

export class EventsDetailComponent {
constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
){}

async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    let componentToRender: any;

    switch (id) {
    case '68404babfb2f3ed418760cfe':
        componentToRender = (await import('../events/fiofanana-detail/fiofanana-detail.component')).FiofananaDetailComponent;
        break;
    case '681e065f3699cad9f7a0eaee':
        componentToRender = (await import('../events/hetsika-iraisam-pirenena-detail/hetsika-iraisam-pirenena-detail.component')).HetsikaIraisamPirenenaDetailComponent;
        break;
    case '68675dd663ec4c5f61b91c2e':
        componentToRender = (await import('../events/lasy-sy-antsaha-detail/lasy-sy-antsaha-detail.component')).LasySyAntsahaDetailComponent;
        break;
    case '68404b57fb2f3ed418760cfd':
        componentToRender = (await import('../events/sahafanilo-detail/sahafanilo-detail.component')).SahafaniloDetailComponent;
        break;
    case '68404a9335c4cc6952dc7e44':
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
}
}
