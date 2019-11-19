
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomRequirementsRoutingModule } from './classroom-requirements.routing.module';
import { ClassroomRequirementsComponent } from './classroom-requirements.component';

@NgModule({
  declarations: [ClassroomRequirementsComponent],
  imports: [
    ClassroomRequirementsRoutingModule,
    CommonModule,
  ]
})
export class ClassroomRequirementsModule { }

