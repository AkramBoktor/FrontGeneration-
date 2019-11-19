import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclaimerEditComponent } from './disclaimer-edit/disclaimer-edit.component';
import { DisclaimerListComponent } from './disclaimer-list/disclaimer-list.component';
import { DisclaimerNewComponent } from './disclaimer-new/disclaimer-new.component';
import { DisclaimerViewComponent } from './disclaimer-view/disclaimer-view.component';
import { DisclaimerGuard } from './shared/disclaimer.guard';

const routes: Routes = [
  {
    path: '',
    component: DisclaimerListComponent,
    canActivate: [DisclaimerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DisclaimerNewComponent,
    canActivate: [DisclaimerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DisclaimerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DisclaimerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DisclaimerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DisclaimerRoutingModule {
}
