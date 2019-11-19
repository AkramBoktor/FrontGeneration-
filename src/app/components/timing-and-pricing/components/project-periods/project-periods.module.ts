import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ProjectPeriodsListComponent } from './project-periods-list/project-periods-list.component';
import { ProjectPeriodsEditComponent } from './project-periods-edit/project-periods-edit.component';
import { ProjectPeriodsNewComponent } from './project-periods-new/project-periods-new.component';
import { ProjectPeriodsViewComponent } from './project-periods-view/project-periods-view.component';
import { ProjectPeriodsRoutingModule } from './project-periods.routing.module';
import { ProjectPeriodsService } from './shared/project-periods.service';
import { ProjectPeriodsGuard } from './shared/project-periods.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ProjectPeriodsListComponent,
    ProjectPeriodsNewComponent,
    ProjectPeriodsEditComponent,
    ProjectPeriodsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ProjectPeriodsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ProjectPeriodsService,
    ProjectPeriodsGuard
  ],
  entryComponents: [
    ProjectPeriodsNewComponent,
    ProjectPeriodsEditComponent,
    ProjectPeriodsViewComponent
  ]
})

export class ProjectPeriodsModule {
}
