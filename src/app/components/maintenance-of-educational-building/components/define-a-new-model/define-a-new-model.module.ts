import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DefineANewModelListComponent } from './define-a-new-model-list/define-a-new-model-list.component';
import { DefineANewModelEditComponent } from './define-a-new-model-edit/define-a-new-model-edit.component';
import { DefineANewModelNewComponent } from './define-a-new-model-new/define-a-new-model-new.component';
import { DefineANewModelViewComponent } from './define-a-new-model-view/define-a-new-model-view.component';
import { DefineANewModelRoutingModule } from './define-a-new-model.routing.module';
import { DefineANewModelService } from './shared/define-a-new-model.service';
import { DefineANewModelGuard } from './shared/define-a-new-model.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DefineANewModelListComponent,
    DefineANewModelNewComponent,
    DefineANewModelEditComponent,
    DefineANewModelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DefineANewModelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DefineANewModelService,
    DefineANewModelGuard
  ],
  entryComponents: [
    DefineANewModelNewComponent,
    DefineANewModelEditComponent,
    DefineANewModelViewComponent
  ]
})

export class DefineANewModelModule {
}
