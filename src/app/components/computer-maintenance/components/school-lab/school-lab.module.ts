import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolLabListComponent } from './school-lab-list/school-lab-list.component';
import { SchoolLabEditComponent } from './school-lab-edit/school-lab-edit.component';
import { SchoolLabNewComponent } from './school-lab-new/school-lab-new.component';
import { SchoolLabViewComponent } from './school-lab-view/school-lab-view.component';
import { SchoolLabRoutingModule } from './school-lab.routing.module';
import { SchoolLabService } from './shared/school-lab.service';
import { SchoolLabGuard } from './shared/school-lab.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolLabListComponent,
    SchoolLabNewComponent,
    SchoolLabEditComponent,
    SchoolLabViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolLabRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolLabService,
    SchoolLabGuard
  ],
  entryComponents: [
    SchoolLabNewComponent,
    SchoolLabEditComponent,
    SchoolLabViewComponent
  ]
})

export class SchoolLabModule {
}
