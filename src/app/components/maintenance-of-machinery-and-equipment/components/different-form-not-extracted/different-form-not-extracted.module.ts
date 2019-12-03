import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DifferentFormNotExtractedListComponent } from './different-form-not-extracted-list/different-form-not-extracted-list.component';
import { DifferentFormNotExtractedEditComponent } from './different-form-not-extracted-edit/different-form-not-extracted-edit.component';
import { DifferentFormNotExtractedNewComponent } from './different-form-not-extracted-new/different-form-not-extracted-new.component';
import { DifferentFormNotExtractedViewComponent } from './different-form-not-extracted-view/different-form-not-extracted-view.component';
import { DifferentFormNotExtractedRoutingModule } from './different-form-not-extracted.routing.module';
import { DifferentFormNotExtractedService } from './shared/different-form-not-extracted.service';
import { DifferentFormNotExtractedGuard } from './shared/different-form-not-extracted.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DifferentFormNotExtractedListComponent,
    DifferentFormNotExtractedNewComponent,
    DifferentFormNotExtractedEditComponent,
    DifferentFormNotExtractedViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DifferentFormNotExtractedRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DifferentFormNotExtractedService,
    DifferentFormNotExtractedGuard
  ],
  entryComponents: [
    DifferentFormNotExtractedNewComponent,
    DifferentFormNotExtractedEditComponent,
    DifferentFormNotExtractedViewComponent
  ]
})

export class DifferentFormNotExtractedModule {
}
