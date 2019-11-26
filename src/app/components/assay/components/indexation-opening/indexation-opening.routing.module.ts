import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IndexationOpeningGuard } from './shared/indexation-opening.guard';
import { IndexationOpeningNewComponent } from './indexation-opening-new/indexation-opening-new.component';
import { IndexationOpeningEditComponent } from './indexation-opening-edit/indexation-opening-edit.component';
import { IndexationOpeningListComponent } from './indexation-opening-list/indexation-opening-list.component';
import { IndexationOpeningViewComponent } from './indexation-opening-view/indexation-opening-view.component';

const routes: Routes = [
  {
    path: '',
    component: IndexationOpeningListComponent,
    canActivate: [IndexationOpeningGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IndexationOpeningNewComponent,
    canActivate: [IndexationOpeningGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IndexationOpeningEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IndexationOpeningListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IndexationOpeningViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IndexationOpeningRoutingModule {
}
