import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExaminationCommitteeDateDataListComponent } from './examination-committee-date-data-list/examination-committee-date-data-list.component';
import { ExaminationCommitteeDateDataEditComponent } from './examination-committee-date-data-edit/examination-committee-date-data-edit.component';
import { ExaminationCommitteeDateDataNewComponent } from './examination-committee-date-data-new/examination-committee-date-data-new.component';
import { ExaminationCommitteeDateDataViewComponent } from './examination-committee-date-data-view/examination-committee-date-data-view.component';
import { ExaminationCommitteeDateDataRoutingModule } from './examination-committee-date-data.routing.module';
import { ExaminationCommitteeDateDataService } from './shared/examination-committee-date-data.service';
import { ExaminationCommitteeDateDataGuard } from './shared/examination-committee-date-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExaminationCommitteeDateDataListComponent,
    ExaminationCommitteeDateDataNewComponent,
    ExaminationCommitteeDateDataEditComponent,
    ExaminationCommitteeDateDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExaminationCommitteeDateDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExaminationCommitteeDateDataService,
    ExaminationCommitteeDateDataGuard
  ],
  entryComponents: [
    ExaminationCommitteeDateDataNewComponent,
    ExaminationCommitteeDateDataEditComponent,
    ExaminationCommitteeDateDataViewComponent
  ]
})

export class ExaminationCommitteeDateDataModule {
}
