
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRelationsRoutingModule } from './public-relations.routing.module';
import { PublicRelationsComponent } from './public-relations.component';

@NgModule({
  declarations: [PublicRelationsComponent],
  imports: [
    PublicRelationsRoutingModule,
    CommonModule,
  ]
})
export class PublicRelationsModule { }

