
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchAndStudiesRoutingModule } from './research-and-studies.routing.module';
import { ResearchAndStudiesComponent } from './research-and-studies.component';

@NgModule({
  declarations: [ResearchAndStudiesComponent],
  imports: [
    ResearchAndStudiesRoutingModule,
    CommonModule,
  ]
})
export class ResearchAndStudiesModule { }

