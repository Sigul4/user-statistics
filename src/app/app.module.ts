import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CircleModule } from './shared/components/circle/circle.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CircleModule,
  ],
  providers: [
      {
          provide: 'API_URL',
          useValue: environment.apiUrl,
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
