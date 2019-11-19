import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { JobPlacementOfTheDepartmentsOfTheBodyListComponent } from './job-placement-of-the-departments-of-the-body-list/job-placement-of-the-departments-of-the-body-list.component';
import { JobPlacementOfTheDepartmentsOfTheBodyEditComponent } from './job-placement-of-the-departments-of-the-body-edit/job-placement-of-the-departments-of-the-body-edit.component';
import { JobPlacementOfTheDepartmentsOfTheBodyNewComponent } from './job-placement-of-the-departments-of-the-body-new/job-placement-of-the-departments-of-the-body-new.component';
import { JobPlacementOfTheDepartmentsOfTheBodyViewComponent } from './job-placement-of-the-departments-of-the-body-view/job-placement-of-the-departments-of-the-body-view.component';
import { JobPlacementOfTheDepartmentsOfTheBodyRoutingModule } from './job-placement-of-the-departments-of-the-body.routing.module';
import { JobPlacementOfTheDepartmentsOfTheBodyService } from './shared/job-placement-of-the-departments-of-the-body.service';
import { JobPlacementOfTheDepartmentsOfTheBodyGuard } from './shared/job-placement-of-the-departments-of-the-body.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    JobPlacementOfTheDepartmentsOfTheBodyListComponent,
    JobPlacementOfTheDepartmentsOfTheBodyNewComponent,
    JobPlacementOfTheDepartmentsOfTheBodyEditComponent,
    JobPlacementOfTheDepartmentsOfTheBodyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    JobPlacementOfTheDepartmentsOfTheBodyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    JobPlacementOfTheDepartmentsOfTheBodyService,
    JobPlacementOfTheDepartmentsOfTheBodyGuard
  ],
  entryComponents: [
    JobPlacementOfTheDepartmentsOfTheBodyNewComponent,
    JobPlacementOfTheDepartmentsOfTheBodyEditComponent,
    JobPlacementOfTheDepartmentsOfTheBodyViewComponent
  ]
})

export class JobPlacementOfTheDepartmentsOfTheBodyModule {
}
