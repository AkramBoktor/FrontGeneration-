import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MaterialTypeListComponent } from './material-type-list/material-type-list.component';
import { MaterialTypeEditComponent } from './material-type-edit/material-type-edit.component';
import { MaterialTypeNewComponent } from './material-type-new/material-type-new.component';
import { MaterialTypeViewComponent } from './material-type-view/material-type-view.component';
import { MaterialTypeRoutingModule } from './material-type.routing.module';
import { MaterialTypeService } from './shared/material-type.service';
import { MaterialTypeGuard } from './shared/material-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MaterialTypeListComponent,
    MaterialTypeNewComponent,
    MaterialTypeEditComponent,
    MaterialTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MaterialTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MaterialTypeService,
    MaterialTypeGuard
  ],
  entryComponents: [
    MaterialTypeNewComponent,
    MaterialTypeEditComponent,
    MaterialTypeViewComponent
  ]
})

export class MaterialTypeModule {
}
