import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionNewComponent } from './promotion-new/promotion-new.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';
import { PromotionGuard } from './shared/promotion.guard';

const routes: Routes = [
  {
    path: '',
    component: PromotionListComponent,
    canActivate: [PromotionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PromotionNewComponent,
    canActivate: [PromotionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PromotionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PromotionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PromotionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PromotionRoutingModule {
}
