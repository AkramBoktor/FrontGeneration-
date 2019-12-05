import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PreviewNotesDataGuard } from './shared/preview-notes-data.guard';
import { PreviewNotesDataNewComponent } from './preview-notes-data-new/preview-notes-data-new.component';
import { PreviewNotesDataEditComponent } from './preview-notes-data-edit/preview-notes-data-edit.component';
import { PreviewNotesDataListComponent } from './preview-notes-data-list/preview-notes-data-list.component';
import { PreviewNotesDataViewComponent } from './preview-notes-data-view/preview-notes-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewNotesDataListComponent,
    canActivate: [PreviewNotesDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PreviewNotesDataNewComponent,
    canActivate: [PreviewNotesDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PreviewNotesDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PreviewNotesDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PreviewNotesDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PreviewNotesDataRoutingModule {
}
