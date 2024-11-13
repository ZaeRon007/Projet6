import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MddapiRoutingModule } from './mddapi/mddapi-routing.module';
import { CoreRoutingModule } from './core/core-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreRoutingModule,
    MddapiRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}