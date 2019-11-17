import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DifferentFormAddedButNotExtractedListComponent } from './different-form-added-but-not-extracted-list/different-form-added-but-not-extracted-list.component';
import { DifferentFormAddedButNotExtractedEditComponent } from './different-form-added-but-not-extracted-edit/different-form-added-but-not-extracted-edit.component';
import { DifferentFormAddedButNotExtractedNewComponent } from './different-form-added-but-not-extracted-new/different-form-added-but-not-extracted-new.component';
import { DifferentFormAddedButNotExtractedViewComponent } from './different-form-added-but-not-extracted-view/different-form-added-but-not-extracted-view.component';
import { DifferentFormAddedButNotExtractedRoutingModule } from './different-form-added-but-not-extracted.routing.module';
import { DifferentFormAddedButNotExtractedService } from './shared/different-form-added-but-not-extracted.service';
import { DifferentFormAddedButNotExtractedGuard } from './shared/different-form-added-but-not-extracted.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DifferentFormAddedButNotExtractedListComponent,
    DifferentFormAddedButNotExtractedNewComponent,
    DifferentFormAddedButNotExtractedEditComponent,
    DifferentFormAddedButNotExtractedViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DifferentFormAddedButNotExtractedRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DifferentFormAddedButNotExtractedService,
    DifferentFormAddedButNotExtractedGuard
  ],
  entryComponents: [
    DifferentFormAddedButNotExtractedNewComponent,
    DifferentFormAddedButNotExtractedEditComponent,
    DifferentFormAddedButNotExtractedViewComponent
  ]
})

export class DifferentFormAddedButNotExtractedModule {
}
