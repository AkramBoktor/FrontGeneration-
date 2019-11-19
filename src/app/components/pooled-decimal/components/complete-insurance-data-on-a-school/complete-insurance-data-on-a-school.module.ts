import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CompleteInsuranceDataOnASchoolListComponent } from './complete-insurance-data-on-a-school-list/complete-insurance-data-on-a-school-list.component';
import { CompleteInsuranceDataOnASchoolEditComponent } from './complete-insurance-data-on-a-school-edit/complete-insurance-data-on-a-school-edit.component';
import { CompleteInsuranceDataOnASchoolNewComponent } from './complete-insurance-data-on-a-school-new/complete-insurance-data-on-a-school-new.component';
import { CompleteInsuranceDataOnASchoolViewComponent } from './complete-insurance-data-on-a-school-view/complete-insurance-data-on-a-school-view.component';
import { CompleteInsuranceDataOnASchoolRoutingModule } from './complete-insurance-data-on-a-school.routing.module';
import { CompleteInsuranceDataOnASchoolService } from './shared/complete-insurance-data-on-a-school.service';
import { CompleteInsuranceDataOnASchoolGuard } from './shared/complete-insurance-data-on-a-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CompleteInsuranceDataOnASchoolListComponent,
    CompleteInsuranceDataOnASchoolNewComponent,
    CompleteInsuranceDataOnASchoolEditComponent,
    CompleteInsuranceDataOnASchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CompleteInsuranceDataOnASchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CompleteInsuranceDataOnASchoolService,
    CompleteInsuranceDataOnASchoolGuard
  ],
  entryComponents: [
    CompleteInsuranceDataOnASchoolNewComponent,
    CompleteInsuranceDataOnASchoolEditComponent,
    CompleteInsuranceDataOnASchoolViewComponent
  ]
})

export class CompleteInsuranceDataOnASchoolModule {
}
