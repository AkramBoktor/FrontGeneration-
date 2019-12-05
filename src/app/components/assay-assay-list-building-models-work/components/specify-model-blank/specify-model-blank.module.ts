import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SpecifyModelBlankListComponent } from './specify-model-blank-list/specify-model-blank-list.component';
import { SpecifyModelBlankEditComponent } from './specify-model-blank-edit/specify-model-blank-edit.component';
import { SpecifyModelBlankNewComponent } from './specify-model-blank-new/specify-model-blank-new.component';
import { SpecifyModelBlankViewComponent } from './specify-model-blank-view/specify-model-blank-view.component';
import { SpecifyModelBlankRoutingModule } from './specify-model-blank.routing.module';
import { SpecifyModelBlankService } from './shared/specify-model-blank.service';
import { SpecifyModelBlankGuard } from './shared/specify-model-blank.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SpecifyModelBlankListComponent,
    SpecifyModelBlankNewComponent,
    SpecifyModelBlankEditComponent,
    SpecifyModelBlankViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SpecifyModelBlankRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SpecifyModelBlankService,
    SpecifyModelBlankGuard
  ],
  entryComponents: [
    SpecifyModelBlankNewComponent,
    SpecifyModelBlankEditComponent,
    SpecifyModelBlankViewComponent
  ]
})

export class SpecifyModelBlankModule {
}
