import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscriberDataGuard } from './shared/subscriber-data.guard';
import { SubscriberDataNewComponent } from './subscriber-data-new/subscriber-data-new.component';
import { SubscriberDataEditComponent } from './subscriber-data-edit/subscriber-data-edit.component';
import { SubscriberDataListComponent } from './subscriber-data-list/subscriber-data-list.component';
import { SubscriberDataViewComponent } from './subscriber-data-view/subscriber-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriberDataListComponent,
    canActivate: [SubscriberDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscriberDataNewComponent,
    canActivate: [SubscriberDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscriberDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscriberDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscriberDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscriberDataRoutingModule {
}
