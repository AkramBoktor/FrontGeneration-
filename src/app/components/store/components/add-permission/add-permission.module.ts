import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AddPermissionListComponent } from './add-permission-list/add-permission-list.component';
import { AddPermissionEditComponent } from './add-permission-edit/add-permission-edit.component';
import { AddPermissionNewComponent } from './add-permission-new/add-permission-new.component';
import { AddPermissionViewComponent } from './add-permission-view/add-permission-view.component';
import { AddPermissionRoutingModule } from './add-permission.routing.module';
import { AddPermissionService } from './shared/add-permission.service';
import { AddPermissionGuard } from './shared/add-permission.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AddPermissionListComponent,
    AddPermissionNewComponent,
    AddPermissionEditComponent,
    AddPermissionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AddPermissionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AddPermissionService,
    AddPermissionGuard
  ],
  entryComponents: [
    AddPermissionNewComponent,
    AddPermissionEditComponent,
    AddPermissionViewComponent
  ]
})

export class AddPermissionModule {
}
