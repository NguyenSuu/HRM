import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { WelcomeModule } from './pages/welcome/welcome.module';
import { ApiInterceptor } from './@core/common/api.interceptor';
import { CoreModule } from './@core/@core.module';
import { CorsIntereptor } from './@core/common/crud.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WelcomeModule,
    CoreModule
  ],
  
  bootstrap: [AppComponent],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,useClass:ApiInterceptor,multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:CorsIntereptor,multi:true
    }
  ]
})
export class AppModule { }
