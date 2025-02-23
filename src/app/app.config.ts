import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MusicaState } from './store/musicas/musica.state';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {provide: BrowserAnimationsModule, useClass: BrowserAnimationsModule}, 
    provideAnimationsAsync(),
    importProvidersFrom(
      NgxsModule.forRoot([MusicaState], {
        developmentMode: !environment.production
      }),
      NgxsLoggerPluginModule.forRoot({
        disabled: environment.production,
        collapsed: true
      })
    )
  ]
};
