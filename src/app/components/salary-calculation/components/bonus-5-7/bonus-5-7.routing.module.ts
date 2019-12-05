import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Bonus57Guard } from './shared/bonus-5-7.guard';
import { Bonus57NewComponent } from './bonus-5-7-new/bonus-5-7-new.component';
import { Bonus57EditComponent } from './bonus-5-7-edit/bonus-5-7-edit.component';
import { Bonus57ListComponent } from './bonus-5-7-list/bonus-5-7-list.component';
import { Bonus57ViewComponent } from './bonus-5-7-view/bonus-5-7-view.component';

const routes: Routes = [
  {
    path: '',
    component: Bonus57ListComponent,
    canActivate: [Bonus57Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: Bonus57NewComponent,
    canActivate: [Bonus57Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: Bonus57EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: Bonus57ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: Bonus57ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class Bonus57RoutingModule {
}
