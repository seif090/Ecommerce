import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../header.interceptor';


@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
