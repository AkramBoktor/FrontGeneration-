import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent } from './linking-codes-schools-with-codes-schools-ministry-list/linking-codes-schools-with-codes-schools-ministry-list.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent } from './linking-codes-schools-with-codes-schools-ministry-edit/linking-codes-schools-with-codes-schools-ministry-edit.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent } from './linking-codes-schools-with-codes-schools-ministry-new/linking-codes-schools-with-codes-schools-ministry-new.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent } from './linking-codes-schools-with-codes-schools-ministry-view/linking-codes-schools-with-codes-schools-ministry-view.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryRoutingModule } from './linking-codes-schools-with-codes-schools-ministry.routing.module';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryService } from './shared/linking-codes-schools-with-codes-schools-ministry.service';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryGuard } from './shared/linking-codes-schools-with-codes-schools-ministry.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent,
    LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent,
    LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent,
    LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkingCodesSchoolsWithCodesSchoolsMinistryRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkingCodesSchoolsWithCodesSchoolsMinistryService,
    LinkingCodesSchoolsWithCodesSchoolsMinistryGuard
  ],
  entryComponents: [
    LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent,
    LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent,
    LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent
  ]
})

export class LinkingCodesSchoolsWithCodesSchoolsMinistryModule {
}
