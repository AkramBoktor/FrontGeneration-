import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GeneralDepartmentOfThePlanAndFollowupListComponent } from './general-department-of-the-plan-and-followup-list/general-department-of-the-plan-and-followup-list.component';
import { GeneralDepartmentOfThePlanAndFollowupEditComponent } from './general-department-of-the-plan-and-followup-edit/general-department-of-the-plan-and-followup-edit.component';
import { GeneralDepartmentOfThePlanAndFollowupNewComponent } from './general-department-of-the-plan-and-followup-new/general-department-of-the-plan-and-followup-new.component';
import { GeneralDepartmentOfThePlanAndFollowupViewComponent } from './general-department-of-the-plan-and-followup-view/general-department-of-the-plan-and-followup-view.component';
import { GeneralDepartmentOfThePlanAndFollowupRoutingModule } from './general-department-of-the-plan-and-followup.routing.module';
import { GeneralDepartmentOfThePlanAndFollowupService } from './shared/general-department-of-the-plan-and-followup.service';
import { GeneralDepartmentOfThePlanAndFollowupGuard } from './shared/general-department-of-the-plan-and-followup.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GeneralDepartmentOfThePlanAndFollowupListComponent,
    GeneralDepartmentOfThePlanAndFollowupNewComponent,
    GeneralDepartmentOfThePlanAndFollowupEditComponent,
    GeneralDepartmentOfThePlanAndFollowupViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GeneralDepartmentOfThePlanAndFollowupRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GeneralDepartmentOfThePlanAndFollowupService,
    GeneralDepartmentOfThePlanAndFollowupGuard
  ],
  entryComponents: [
    GeneralDepartmentOfThePlanAndFollowupNewComponent,
    GeneralDepartmentOfThePlanAndFollowupEditComponent,
    GeneralDepartmentOfThePlanAndFollowupViewComponent
  ]
})

export class GeneralDepartmentOfThePlanAndFollowupModule {
}
