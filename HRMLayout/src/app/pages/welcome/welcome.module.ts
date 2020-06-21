import { NgModule } from '@angular/core';


import { WelcomeComponent } from './welcome.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    
    BrowserAnimationsModule,],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class WelcomeModule { }
