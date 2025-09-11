import { Routes } from "@angular/router";
import { AboutComponent } from "./about.component";
import { AboutHistoryComponent } from "./about-history/about-history.component";
import { AboutLeadersComponent } from "./about-leaders/about-leaders.component";
import { AboutSpiritualComponent } from "./about-spiritual/about-spiritual.component";
import { AboutStructureComponent } from "./about-structure/about-structure.component";
import { AboutDiocesesComponent } from "./about-dioceses/about-dioceses.component";

export const aboutRoutes: Routes = [
    { path: '', component: AboutComponent,
        data: { title: 'Momba anay - Fanilon\'I Madagasikara'}
    },
    { path: 'tantara', component: AboutHistoryComponent,
        data: { title: 'Tantara - Fanilon\'I Madagasikara'}
    },
    { path: 'mpitondra', component: AboutLeadersComponent,
        data: { title: 'Mpitondra - Fanilon\'I Madagasikara'}
    },
    { path: 'aim-panahy', component: AboutSpiritualComponent,
        data: { title: 'Aim-panahy - Fanilon\'I Madagasikara'}
    },
    { path: 'rafitra', component: AboutStructureComponent,
        data: { title: 'Rafitra - Fanilon\'I Madagasikara'}
    },
    { path: 'diosezy', component: AboutDiocesesComponent,
        data: { title: 'Diosezy - Fanilon\'I Madagasikara'}
    }
]
