import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegisterANewCollectionCodeListComponent } from './register-a-new-collection-code-list/register-a-new-collection-code-list.component';
import { RegisterANewCollectionCodeEditComponent } from './register-a-new-collection-code-edit/register-a-new-collection-code-edit.component';
import { RegisterANewCollectionCodeNewComponent } from './register-a-new-collection-code-new/register-a-new-collection-code-new.component';
import { RegisterANewCollectionCodeViewComponent } from './register-a-new-collection-code-view/register-a-new-collection-code-view.component';
import { RegisterANewCollectionCodeRoutingModule } from './register-a-new-collection-code.routing.module';
import { RegisterANewCollectionCodeService } from './shared/register-a-new-collection-code.service';
import { RegisterANewCollectionCodeGuard } from './shared/register-a-new-collection-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegisterANewCollectionCodeListComponent,
    RegisterANewCollectionCodeNewComponent,
    RegisterANewCollectionCodeEditComponent,
    RegisterANewCollectionCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegisterANewCollectionCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegisterANewCollectionCodeService,
    RegisterANewCollectionCodeGuard
  ],
  entryComponents: [
    RegisterANewCollectionCodeNewComponent,
    RegisterANewCollectionCodeEditComponent,
    RegisterANewCollectionCodeViewComponent
  ]
})

export class RegisterANewCollectionCodeModule {
}
