import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SourceCodeListComponent } from './source-code-list/source-code-list.component';
import { SourceCodeEditComponent } from './source-code-edit/source-code-edit.component';
import { SourceCodeNewComponent } from './source-code-new/source-code-new.component';
import { SourceCodeViewComponent } from './source-code-view/source-code-view.component';
import { SourceCodeRoutingModule } from './source-code.routing.module';
import { SourceCodeService } from './shared/source-code.service';
import { SourceCodeGuard } from './shared/source-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SourceCodeListComponent,
    SourceCodeNewComponent,
    SourceCodeEditComponent,
    SourceCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SourceCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SourceCodeService,
    SourceCodeGuard
  ],
  entryComponents: [
    SourceCodeNewComponent,
    SourceCodeEditComponent,
    SourceCodeViewComponent
  ]
})

export class SourceCodeModule {
}
