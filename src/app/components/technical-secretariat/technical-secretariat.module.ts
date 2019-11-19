
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalSecretariatRoutingModule } from './technical-secretariat.routing.module';
import { TechnicalSecretariatComponent } from './technical-secretariat.component';

@NgModule({
  declarations: [TechnicalSecretariatComponent],
  imports: [
    TechnicalSecretariatRoutingModule,
    CommonModule,
  ]
})
export class TechnicalSecretariatModule { }

