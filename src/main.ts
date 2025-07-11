import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, ExtraOptions, withRouterConfig } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localMg from '@angular/common/locales/mg';
import { routes} from './app/app.routes';
import { appConfig } from './app/app.config';
import { authInterceptor } from './app/core/auth.interceptor';

registerLocaleData(localMg);

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withRouterConfig(routerOptions)),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
