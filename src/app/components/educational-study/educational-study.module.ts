
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationalStudyRoutingModule } from './educational-study.routing.module';
import { EducationalStudyComponent } from './educational-study.component';

@NgModule({
  declarations: [EducationalStudyComponent],
  imports: [
    EducationalStudyRoutingModule,
    CommonModule,
  ]
})
export class EducationalStudyModule { }

