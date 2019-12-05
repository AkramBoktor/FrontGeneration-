import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PromotionalBonusGuard } from './shared/promotional-bonus.guard';
import { PromotionalBonusNewComponent } from './promotional-bonus-new/promotional-bonus-new.component';
import { PromotionalBonusEditComponent } from './promotional-bonus-edit/promotional-bonus-edit.component';
import { PromotionalBonusListComponent } from './promotional-bonus-list/promotional-bonus-list.component';
import { PromotionalBonusViewComponent } from './promotional-bonus-view/promotional-bonus-view.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionalBonusListComponent,
    canActivate: [PromotionalBonusGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PromotionalBonusNewComponent,
    canActivate: [PromotionalBonusGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PromotionalBonusEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PromotionalBonusListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PromotionalBonusViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PromotionalBonusRoutingModule {
}
