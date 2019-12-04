import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeviceCancellationGuard } from './shared/device-cancellation.guard';
import { DeviceCancellationNewComponent } from './device-cancellation-new/device-cancellation-new.component';
import { DeviceCancellationEditComponent } from './device-cancellation-edit/device-cancellation-edit.component';
import { DeviceCancellationListComponent } from './device-cancellation-list/device-cancellation-list.component';
import { DeviceCancellationViewComponent } from './device-cancellation-view/device-cancellation-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceCancellationListComponent,
    canActivate: [DeviceCancellationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeviceCancellationNewComponent,
    canActivate: [DeviceCancellationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeviceCancellationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeviceCancellationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeviceCancellationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeviceCancellationRoutingModule {
}
