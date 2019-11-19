
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase.routing.module';
import { PurchaseComponent } from './purchase.component';

@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    PurchaseRoutingModule,
    CommonModule,
  ]
})
export class PurchaseModule { }

