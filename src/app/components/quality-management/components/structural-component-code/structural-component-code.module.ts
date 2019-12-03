import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { StructuralComponentCodeListComponent } from './structural-component-code-list/structural-component-code-list.component';
import { StructuralComponentCodeEditComponent } from './structural-component-code-edit/structural-component-code-edit.component';
import { StructuralComponentCodeNewComponent } from './structural-component-code-new/structural-component-code-new.component';
import { StructuralComponentCodeViewComponent } from './structural-component-code-view/structural-component-code-view.component';
import { StructuralComponentCodeRoutingModule } from './structural-component-code.routing.module';
import { StructuralComponentCodeService } from './shared/structural-component-code.service';
import { StructuralComponentCodeGuard } from './shared/structural-component-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    StructuralComponentCodeListComponent,
    StructuralComponentCodeNewComponent,
    StructuralComponentCodeEditComponent,
    StructuralComponentCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    StructuralComponentCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    StructuralComponentCodeService,
    StructuralComponentCodeGuard
  ],
  entryComponents: [
    StructuralComponentCodeNewComponent,
    StructuralComponentCodeEditComponent,
    StructuralComponentCodeViewComponent
  ]
})

export class StructuralComponentCodeModule {
}
