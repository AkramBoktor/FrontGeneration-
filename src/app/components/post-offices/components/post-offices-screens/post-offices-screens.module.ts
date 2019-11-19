import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PostOfficesScreensListComponent } from './post-offices-screens-list/post-offices-screens-list.component';
import { PostOfficesScreensEditComponent } from './post-offices-screens-edit/post-offices-screens-edit.component';
import { PostOfficesScreensNewComponent } from './post-offices-screens-new/post-offices-screens-new.component';
import { PostOfficesScreensViewComponent } from './post-offices-screens-view/post-offices-screens-view.component';
import { PostOfficesScreensRoutingModule } from './post-offices-screens.routing.module';
import { PostOfficesScreensService } from './shared/post-offices-screens.service';
import { PostOfficesScreensGuard } from './shared/post-offices-screens.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PostOfficesScreensListComponent,
    PostOfficesScreensNewComponent,
    PostOfficesScreensEditComponent,
    PostOfficesScreensViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PostOfficesScreensRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PostOfficesScreensService,
    PostOfficesScreensGuard
  ],
  entryComponents: [
    PostOfficesScreensNewComponent,
    PostOfficesScreensEditComponent,
    PostOfficesScreensViewComponent
  ]
})

export class PostOfficesScreensModule {
}
