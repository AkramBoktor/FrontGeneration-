import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExaminationCommitteeMemberDataListComponent } from './examination-committee-member-data-list/examination-committee-member-data-list.component';
import { ExaminationCommitteeMemberDataEditComponent } from './examination-committee-member-data-edit/examination-committee-member-data-edit.component';
import { ExaminationCommitteeMemberDataNewComponent } from './examination-committee-member-data-new/examination-committee-member-data-new.component';
import { ExaminationCommitteeMemberDataViewComponent } from './examination-committee-member-data-view/examination-committee-member-data-view.component';
import { ExaminationCommitteeMemberDataRoutingModule } from './examination-committee-member-data.routing.module';
import { ExaminationCommitteeMemberDataService } from './shared/examination-committee-member-data.service';
import { ExaminationCommitteeMemberDataGuard } from './shared/examination-committee-member-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExaminationCommitteeMemberDataListComponent,
    ExaminationCommitteeMemberDataNewComponent,
    ExaminationCommitteeMemberDataEditComponent,
    ExaminationCommitteeMemberDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExaminationCommitteeMemberDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExaminationCommitteeMemberDataService,
    ExaminationCommitteeMemberDataGuard
  ],
  entryComponents: [
    ExaminationCommitteeMemberDataNewComponent,
    ExaminationCommitteeMemberDataEditComponent,
    ExaminationCommitteeMemberDataViewComponent
  ]
})

export class ExaminationCommitteeMemberDataModule {
}
