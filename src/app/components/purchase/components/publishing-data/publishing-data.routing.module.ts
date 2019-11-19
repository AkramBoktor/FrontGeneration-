import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PublishingDataGuard } from './shared/publishing-data.guard';
import { PublishingDataNewComponent } from './publishing-data-new/publishing-data-new.component';
import { PublishingDataEditComponent } from './publishing-data-edit/publishing-data-edit.component';
import { PublishingDataListComponent } from './publishing-data-list/publishing-data-list.component';
import { PublishingDataViewComponent } from './publishing-data-view/publishing-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PublishingDataListComponent,
    canActivate: [PublishingDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PublishingDataNewComponent,
    canActivate: [PublishingDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PublishingDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PublishingDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PublishingDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PublishingDataRoutingModule {
}
