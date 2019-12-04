import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommentOnPhotosAndBuildingDrawingGuard } from './shared/comment-on-photos-and-building-drawing.guard';
import { CommentOnPhotosAndBuildingDrawingNewComponent } from './comment-on-photos-and-building-drawing-new/comment-on-photos-and-building-drawing-new.component';
import { CommentOnPhotosAndBuildingDrawingEditComponent } from './comment-on-photos-and-building-drawing-edit/comment-on-photos-and-building-drawing-edit.component';
import { CommentOnPhotosAndBuildingDrawingListComponent } from './comment-on-photos-and-building-drawing-list/comment-on-photos-and-building-drawing-list.component';
import { CommentOnPhotosAndBuildingDrawingViewComponent } from './comment-on-photos-and-building-drawing-view/comment-on-photos-and-building-drawing-view.component';

const routes: Routes = [
  {
    path: '',
    component: CommentOnPhotosAndBuildingDrawingListComponent,
    canActivate: [CommentOnPhotosAndBuildingDrawingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CommentOnPhotosAndBuildingDrawingNewComponent,
    canActivate: [CommentOnPhotosAndBuildingDrawingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CommentOnPhotosAndBuildingDrawingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CommentOnPhotosAndBuildingDrawingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CommentOnPhotosAndBuildingDrawingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CommentOnPhotosAndBuildingDrawingRoutingModule {
}
