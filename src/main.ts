import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, ExtraOptions, withRouterConfig } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localMg from '@angular/common/locales/mg';
import { routes} from './app/app.routes';
import { appConfig } from './app/app.config';

registerLocaleData(localMg);

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withRouterConfig(routerOptions)),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
