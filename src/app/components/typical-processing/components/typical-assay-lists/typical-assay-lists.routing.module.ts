import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalAssayListsGuard } from './shared/typical-assay-lists.guard';
import { TypicalAssayListsNewComponent } from './typical-assay-lists-new/typical-assay-lists-new.component';
import { TypicalAssayListsEditComponent } from './typical-assay-lists-edit/typical-assay-lists-edit.component';
import { TypicalAssayListsListComponent } from './typical-assay-lists-list/typical-assay-lists-list.component';
import { TypicalAssayListsViewComponent } from './typical-assay-lists-view/typical-assay-lists-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalAssayListsListComponent,
    canActivate: [TypicalAssayListsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalAssayListsNewComponent,
    canActivate: [TypicalAssayListsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalAssayListsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalAssayListsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalAssayListsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalAssayListsRoutingModule {
}
