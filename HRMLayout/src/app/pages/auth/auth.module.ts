import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NzFormModule, NzInputModule, NzButtonModule, NzGridModule, NzCheckboxModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    AuthRoutingModule,
    NzCheckboxModule
  ]
})
export class AuthModule { }
