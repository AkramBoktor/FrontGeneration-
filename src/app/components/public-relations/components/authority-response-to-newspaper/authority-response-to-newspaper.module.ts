import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AuthorityResponseToNewspaperListComponent } from './authority-response-to-newspaper-list/authority-response-to-newspaper-list.component';
import { AuthorityResponseToNewspaperEditComponent } from './authority-response-to-newspaper-edit/authority-response-to-newspaper-edit.component';
import { AuthorityResponseToNewspaperNewComponent } from './authority-response-to-newspaper-new/authority-response-to-newspaper-new.component';
import { AuthorityResponseToNewspaperViewComponent } from './authority-response-to-newspaper-view/authority-response-to-newspaper-view.component';
import { AuthorityResponseToNewspaperRoutingModule } from './authority-response-to-newspaper.routing.module';
import { AuthorityResponseToNewspaperService } from './shared/authority-response-to-newspaper.service';
import { AuthorityResponseToNewspaperGuard } from './shared/authority-response-to-newspaper.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AuthorityResponseToNewspaperListComponent,
    AuthorityResponseToNewspaperNewComponent,
    AuthorityResponseToNewspaperEditComponent,
    AuthorityResponseToNewspaperViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AuthorityResponseToNewspaperRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AuthorityResponseToNewspaperService,
    AuthorityResponseToNewspaperGuard
  ],
  entryComponents: [
    AuthorityResponseToNewspaperNewComponent,
    AuthorityResponseToNewspaperEditComponent,
    AuthorityResponseToNewspaperViewComponent
  ]
})

export class AuthorityResponseToNewspaperModule {
}
