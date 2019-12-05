import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BasicMaterialCodeListComponent } from './basic-material-code-list/basic-material-code-list.component';
import { BasicMaterialCodeEditComponent } from './basic-material-code-edit/basic-material-code-edit.component';
import { BasicMaterialCodeNewComponent } from './basic-material-code-new/basic-material-code-new.component';
import { BasicMaterialCodeViewComponent } from './basic-material-code-view/basic-material-code-view.component';
import { BasicMaterialCodeRoutingModule } from './basic-material-code.routing.module';
import { BasicMaterialCodeService } from './shared/basic-material-code.service';
import { BasicMaterialCodeGuard } from './shared/basic-material-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BasicMaterialCodeListComponent,
    BasicMaterialCodeNewComponent,
    BasicMaterialCodeEditComponent,
    BasicMaterialCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BasicMaterialCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BasicMaterialCodeService,
    BasicMaterialCodeGuard
  ],
  entryComponents: [
    BasicMaterialCodeNewComponent,
    BasicMaterialCodeEditComponent,
    BasicMaterialCodeViewComponent
  ]
})

export class BasicMaterialCodeModule {
}
