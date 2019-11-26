import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BaseTypeListComponent } from './base-type-list/base-type-list.component';
import { BaseTypeEditComponent } from './base-type-edit/base-type-edit.component';
import { BaseTypeNewComponent } from './base-type-new/base-type-new.component';
import { BaseTypeViewComponent } from './base-type-view/base-type-view.component';
import { BaseTypeRoutingModule } from './base-type.routing.module';
import { BaseTypeService } from './shared/base-type.service';
import { BaseTypeGuard } from './shared/base-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BaseTypeListComponent,
    BaseTypeNewComponent,
    BaseTypeEditComponent,
    BaseTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BaseTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BaseTypeService,
    BaseTypeGuard
  ],
  entryComponents: [
    BaseTypeNewComponent,
    BaseTypeEditComponent,
    BaseTypeViewComponent
  ]
})

export class BaseTypeModule {
}
