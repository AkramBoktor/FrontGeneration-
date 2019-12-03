import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NoteSeenByTheChemistryLaboratoryGuard } from './shared/note-seen-by-the-chemistry-laboratory.guard';
import { NoteSeenByTheChemistryLaboratoryNewComponent } from './note-seen-by-the-chemistry-laboratory-new/note-seen-by-the-chemistry-laboratory-new.component';
import { NoteSeenByTheChemistryLaboratoryEditComponent } from './note-seen-by-the-chemistry-laboratory-edit/note-seen-by-the-chemistry-laboratory-edit.component';
import { NoteSeenByTheChemistryLaboratoryListComponent } from './note-seen-by-the-chemistry-laboratory-list/note-seen-by-the-chemistry-laboratory-list.component';
import { NoteSeenByTheChemistryLaboratoryViewComponent } from './note-seen-by-the-chemistry-laboratory-view/note-seen-by-the-chemistry-laboratory-view.component';

const routes: Routes = [
  {
    path: '',
    component: NoteSeenByTheChemistryLaboratoryListComponent,
    canActivate: [NoteSeenByTheChemistryLaboratoryGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NoteSeenByTheChemistryLaboratoryNewComponent,
    canActivate: [NoteSeenByTheChemistryLaboratoryGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NoteSeenByTheChemistryLaboratoryEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NoteSeenByTheChemistryLaboratoryListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NoteSeenByTheChemistryLaboratoryViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NoteSeenByTheChemistryLaboratoryRoutingModule {
}
