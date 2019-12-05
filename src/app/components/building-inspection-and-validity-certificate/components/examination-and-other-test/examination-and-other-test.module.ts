import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExaminationAndOtherTestListComponent } from './examination-and-other-test-list/examination-and-other-test-list.component';
import { ExaminationAndOtherTestEditComponent } from './examination-and-other-test-edit/examination-and-other-test-edit.component';
import { ExaminationAndOtherTestNewComponent } from './examination-and-other-test-new/examination-and-other-test-new.component';
import { ExaminationAndOtherTestViewComponent } from './examination-and-other-test-view/examination-and-other-test-view.component';
import { ExaminationAndOtherTestRoutingModule } from './examination-and-other-test.routing.module';
import { ExaminationAndOtherTestService } from './shared/examination-and-other-test.service';
import { ExaminationAndOtherTestGuard } from './shared/examination-and-other-test.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExaminationAndOtherTestListComponent,
    ExaminationAndOtherTestNewComponent,
    ExaminationAndOtherTestEditComponent,
    ExaminationAndOtherTestViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExaminationAndOtherTestRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExaminationAndOtherTestService,
    ExaminationAndOtherTestGuard
  ],
  entryComponents: [
    ExaminationAndOtherTestNewComponent,
    ExaminationAndOtherTestEditComponent,
    ExaminationAndOtherTestViewComponent
  ]
})

export class ExaminationAndOtherTestModule {
}
