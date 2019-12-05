import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PrivateSchoolTrafficCommitteeListComponent } from './private-school-traffic-committee-list/private-school-traffic-committee-list.component';
import { PrivateSchoolTrafficCommitteeEditComponent } from './private-school-traffic-committee-edit/private-school-traffic-committee-edit.component';
import { PrivateSchoolTrafficCommitteeNewComponent } from './private-school-traffic-committee-new/private-school-traffic-committee-new.component';
import { PrivateSchoolTrafficCommitteeViewComponent } from './private-school-traffic-committee-view/private-school-traffic-committee-view.component';
import { PrivateSchoolTrafficCommitteeRoutingModule } from './private-school-traffic-committee.routing.module';
import { PrivateSchoolTrafficCommitteeService } from './shared/private-school-traffic-committee.service';
import { PrivateSchoolTrafficCommitteeGuard } from './shared/private-school-traffic-committee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PrivateSchoolTrafficCommitteeListComponent,
    PrivateSchoolTrafficCommitteeNewComponent,
    PrivateSchoolTrafficCommitteeEditComponent,
    PrivateSchoolTrafficCommitteeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PrivateSchoolTrafficCommitteeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PrivateSchoolTrafficCommitteeService,
    PrivateSchoolTrafficCommitteeGuard
  ],
  entryComponents: [
    PrivateSchoolTrafficCommitteeNewComponent,
    PrivateSchoolTrafficCommitteeEditComponent,
    PrivateSchoolTrafficCommitteeViewComponent
  ]
})

export class PrivateSchoolTrafficCommitteeModule {
}
