
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesAssociationRoutingModule } from './services-association.routing.module';
import { ServicesAssociationComponent } from './services-association.component';

@NgModule({
  declarations: [ServicesAssociationComponent],
  imports: [
    ServicesAssociationRoutingModule,
    CommonModule,
  ]
})
export class ServicesAssociationModule { }

