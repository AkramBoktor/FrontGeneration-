import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OperativeSentenceEditComponent } from './operative-sentence-edit/operative-sentence-edit.component';
import { OperativeSentenceListComponent } from './operative-sentence-list/operative-sentence-list.component';
import { OperativeSentenceNewComponent } from './operative-sentence-new/operative-sentence-new.component';
import { OperativeSentenceViewComponent } from './operative-sentence-view/operative-sentence-view.component';
import { OperativeSentenceRoutingModule } from './operative-sentence.routing.module';
import { OperativeSentenceGuard } from './shared/operative-sentence.guard';
import { OperativeSentenceService } from './shared/operative-sentence.service';

@NgModule({
  declarations: [
    OperativeSentenceListComponent,
    OperativeSentenceNewComponent,
    OperativeSentenceEditComponent,
    OperativeSentenceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OperativeSentenceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OperativeSentenceService,
    OperativeSentenceGuard
  ],
  entryComponents: [
    OperativeSentenceNewComponent,
    OperativeSentenceEditComponent,
    OperativeSentenceViewComponent
  ]
})

export class OperativeSentenceModule {
}
