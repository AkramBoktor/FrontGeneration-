import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CommentOnPhotosAndBuildingDrawingListComponent } from './comment-on-photos-and-building-drawing-list/comment-on-photos-and-building-drawing-list.component';
import { CommentOnPhotosAndBuildingDrawingEditComponent } from './comment-on-photos-and-building-drawing-edit/comment-on-photos-and-building-drawing-edit.component';
import { CommentOnPhotosAndBuildingDrawingNewComponent } from './comment-on-photos-and-building-drawing-new/comment-on-photos-and-building-drawing-new.component';
import { CommentOnPhotosAndBuildingDrawingViewComponent } from './comment-on-photos-and-building-drawing-view/comment-on-photos-and-building-drawing-view.component';
import { CommentOnPhotosAndBuildingDrawingRoutingModule } from './comment-on-photos-and-building-drawing.routing.module';
import { CommentOnPhotosAndBuildingDrawingService } from './shared/comment-on-photos-and-building-drawing.service';
import { CommentOnPhotosAndBuildingDrawingGuard } from './shared/comment-on-photos-and-building-drawing.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CommentOnPhotosAndBuildingDrawingListComponent,
    CommentOnPhotosAndBuildingDrawingNewComponent,
    CommentOnPhotosAndBuildingDrawingEditComponent,
    CommentOnPhotosAndBuildingDrawingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CommentOnPhotosAndBuildingDrawingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CommentOnPhotosAndBuildingDrawingService,
    CommentOnPhotosAndBuildingDrawingGuard
  ],
  entryComponents: [
    CommentOnPhotosAndBuildingDrawingNewComponent,
    CommentOnPhotosAndBuildingDrawingEditComponent,
    CommentOnPhotosAndBuildingDrawingViewComponent
  ]
})

export class CommentOnPhotosAndBuildingDrawingModule {
}
