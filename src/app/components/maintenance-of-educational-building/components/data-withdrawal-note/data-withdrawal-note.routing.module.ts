import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataWithdrawalNoteGuard } from './shared/data-withdrawal-note.guard';
import { DataWithdrawalNoteNewComponent } from './data-withdrawal-note-new/data-withdrawal-note-new.component';
import { DataWithdrawalNoteEditComponent } from './data-withdrawal-note-edit/data-withdrawal-note-edit.component';
import { DataWithdrawalNoteListComponent } from './data-withdrawal-note-list/data-withdrawal-note-list.component';
import { DataWithdrawalNoteViewComponent } from './data-withdrawal-note-view/data-withdrawal-note-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataWithdrawalNoteListComponent,
    canActivate: [DataWithdrawalNoteGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataWithdrawalNoteNewComponent,
    canActivate: [DataWithdrawalNoteGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataWithdrawalNoteEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataWithdrawalNoteListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataWithdrawalNoteViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataWithdrawalNoteRoutingModule {
}
