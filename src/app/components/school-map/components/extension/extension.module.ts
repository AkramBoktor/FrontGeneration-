import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExtensionListComponent } from './extension-list/extension-list.component';
import { ExtensionEditComponent } from './extension-edit/extension-edit.component';
import { ExtensionNewComponent } from './extension-new/extension-new.component';
import { ExtensionViewComponent } from './extension-view/extension-view.component';
import { ExtensionRoutingModule } from './extension.routing.module';
import { ExtensionService } from './shared/extension.service';
import { ExtensionGuard } from './shared/extension.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExtensionListComponent,
    ExtensionNewComponent,
    ExtensionEditComponent,
    ExtensionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExtensionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExtensionService,
    ExtensionGuard
  ],
  entryComponents: [
    ExtensionNewComponent,
    ExtensionEditComponent,
    ExtensionViewComponent
  ]
})

export class ExtensionModule {
}
