import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalItemsOfAssayListsGuard } from './shared/typical-items-of-assay-lists.guard';
import { TypicalItemsOfAssayListsNewComponent } from './typical-items-of-assay-lists-new/typical-items-of-assay-lists-new.component';
import { TypicalItemsOfAssayListsEditComponent } from './typical-items-of-assay-lists-edit/typical-items-of-assay-lists-edit.component';
import { TypicalItemsOfAssayListsListComponent } from './typical-items-of-assay-lists-list/typical-items-of-assay-lists-list.component';
import { TypicalItemsOfAssayListsViewComponent } from './typical-items-of-assay-lists-view/typical-items-of-assay-lists-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalItemsOfAssayListsListComponent,
    canActivate: [TypicalItemsOfAssayListsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalItemsOfAssayListsNewComponent,
    canActivate: [TypicalItemsOfAssayListsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalItemsOfAssayListsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalItemsOfAssayListsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalItemsOfAssayListsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalItemsOfAssayListsRoutingModule {
}
