
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolMapRoutingModule } from './school-map.routing.module';
import { SchoolMapComponent } from './school-map.component';

@NgModule({
  declarations: [SchoolMapComponent],
  imports: [
    SchoolMapRoutingModule,
    CommonModule,
  ]
})
export class SchoolMapModule { }

