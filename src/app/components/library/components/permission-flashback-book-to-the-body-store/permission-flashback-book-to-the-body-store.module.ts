import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PermissionFlashbackBookToTheBodyStoreListComponent } from './permission-flashback-book-to-the-body-store-list/permission-flashback-book-to-the-body-store-list.component';
import { PermissionFlashbackBookToTheBodyStoreEditComponent } from './permission-flashback-book-to-the-body-store-edit/permission-flashback-book-to-the-body-store-edit.component';
import { PermissionFlashbackBookToTheBodyStoreNewComponent } from './permission-flashback-book-to-the-body-store-new/permission-flashback-book-to-the-body-store-new.component';
import { PermissionFlashbackBookToTheBodyStoreViewComponent } from './permission-flashback-book-to-the-body-store-view/permission-flashback-book-to-the-body-store-view.component';
import { PermissionFlashbackBookToTheBodyStoreRoutingModule } from './permission-flashback-book-to-the-body-store.routing.module';
import { PermissionFlashbackBookToTheBodyStoreService } from './shared/permission-flashback-book-to-the-body-store.service';
import { PermissionFlashbackBookToTheBodyStoreGuard } from './shared/permission-flashback-book-to-the-body-store.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PermissionFlashbackBookToTheBodyStoreListComponent,
    PermissionFlashbackBookToTheBodyStoreNewComponent,
    PermissionFlashbackBookToTheBodyStoreEditComponent,
    PermissionFlashbackBookToTheBodyStoreViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PermissionFlashbackBookToTheBodyStoreRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PermissionFlashbackBookToTheBodyStoreService,
    PermissionFlashbackBookToTheBodyStoreGuard
  ],
  entryComponents: [
    PermissionFlashbackBookToTheBodyStoreNewComponent,
    PermissionFlashbackBookToTheBodyStoreEditComponent,
    PermissionFlashbackBookToTheBodyStoreViewComponent
  ]
})

export class PermissionFlashbackBookToTheBodyStoreModule {
}
