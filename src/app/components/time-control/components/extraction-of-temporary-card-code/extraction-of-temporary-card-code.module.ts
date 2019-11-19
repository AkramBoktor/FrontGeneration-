import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExtractionOfTemporaryCardCodeListComponent } from './extraction-of-temporary-card-code-list/extraction-of-temporary-card-code-list.component';
import { ExtractionOfTemporaryCardCodeEditComponent } from './extraction-of-temporary-card-code-edit/extraction-of-temporary-card-code-edit.component';
import { ExtractionOfTemporaryCardCodeNewComponent } from './extraction-of-temporary-card-code-new/extraction-of-temporary-card-code-new.component';
import { ExtractionOfTemporaryCardCodeViewComponent } from './extraction-of-temporary-card-code-view/extraction-of-temporary-card-code-view.component';
import { ExtractionOfTemporaryCardCodeRoutingModule } from './extraction-of-temporary-card-code.routing.module';
import { ExtractionOfTemporaryCardCodeService } from './shared/extraction-of-temporary-card-code.service';
import { ExtractionOfTemporaryCardCodeGuard } from './shared/extraction-of-temporary-card-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExtractionOfTemporaryCardCodeListComponent,
    ExtractionOfTemporaryCardCodeNewComponent,
    ExtractionOfTemporaryCardCodeEditComponent,
    ExtractionOfTemporaryCardCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExtractionOfTemporaryCardCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExtractionOfTemporaryCardCodeService,
    ExtractionOfTemporaryCardCodeGuard
  ],
  entryComponents: [
    ExtractionOfTemporaryCardCodeNewComponent,
    ExtractionOfTemporaryCardCodeEditComponent,
    ExtractionOfTemporaryCardCodeViewComponent
  ]
})

export class ExtractionOfTemporaryCardCodeModule {
}
