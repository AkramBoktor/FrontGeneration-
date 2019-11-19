import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TenderDataGuard } from './shared/tender-data.guard';
import { TenderDataNewComponent } from './tender-data-new/tender-data-new.component';
import { TenderDataEditComponent } from './tender-data-edit/tender-data-edit.component';
import { TenderDataListComponent } from './tender-data-list/tender-data-list.component';
import { TenderDataViewComponent } from './tender-data-view/tender-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: TenderDataListComponent,
    canActivate: [TenderDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TenderDataNewComponent,
    canActivate: [TenderDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TenderDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TenderDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TenderDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TenderDataRoutingModule {
}
