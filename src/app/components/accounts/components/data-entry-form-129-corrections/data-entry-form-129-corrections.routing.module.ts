import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataEntryForm129CorrectionsGuard } from './shared/data-entry-form-129-corrections.guard';
import { DataEntryForm129CorrectionsNewComponent } from './data-entry-form-129-corrections-new/data-entry-form-129-corrections-new.component';
import { DataEntryForm129CorrectionsEditComponent } from './data-entry-form-129-corrections-edit/data-entry-form-129-corrections-edit.component';
import { DataEntryForm129CorrectionsListComponent } from './data-entry-form-129-corrections-list/data-entry-form-129-corrections-list.component';
import { DataEntryForm129CorrectionsViewComponent } from './data-entry-form-129-corrections-view/data-entry-form-129-corrections-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataEntryForm129CorrectionsListComponent,
    canActivate: [DataEntryForm129CorrectionsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataEntryForm129CorrectionsNewComponent,
    canActivate: [DataEntryForm129CorrectionsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataEntryForm129CorrectionsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataEntryForm129CorrectionsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataEntryForm129CorrectionsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataEntryForm129CorrectionsRoutingModule {
}
