import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RespondToVisaGuard } from './shared/respond-to-visa.guard';
import { RespondToVisaNewComponent } from './respond-to-visa-new/respond-to-visa-new.component';
import { RespondToVisaEditComponent } from './respond-to-visa-edit/respond-to-visa-edit.component';
import { RespondToVisaListComponent } from './respond-to-visa-list/respond-to-visa-list.component';
import { RespondToVisaViewComponent } from './respond-to-visa-view/respond-to-visa-view.component';

const routes: Routes = [
  {
    path: '',
    component: RespondToVisaListComponent,
    canActivate: [RespondToVisaGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RespondToVisaNewComponent,
    canActivate: [RespondToVisaGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RespondToVisaEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RespondToVisaListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RespondToVisaViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RespondToVisaRoutingModule {
}
