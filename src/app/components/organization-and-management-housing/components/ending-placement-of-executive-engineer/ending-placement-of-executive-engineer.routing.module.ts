import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EndingPlacementOfExecutiveEngineerGuard } from './shared/ending-placement-of-executive-engineer.guard';
import { EndingPlacementOfExecutiveEngineerNewComponent } from './ending-placement-of-executive-engineer-new/ending-placement-of-executive-engineer-new.component';
import { EndingPlacementOfExecutiveEngineerEditComponent } from './ending-placement-of-executive-engineer-edit/ending-placement-of-executive-engineer-edit.component';
import { EndingPlacementOfExecutiveEngineerListComponent } from './ending-placement-of-executive-engineer-list/ending-placement-of-executive-engineer-list.component';
import { EndingPlacementOfExecutiveEngineerViewComponent } from './ending-placement-of-executive-engineer-view/ending-placement-of-executive-engineer-view.component';

const routes: Routes = [
  {
    path: '',
    component: EndingPlacementOfExecutiveEngineerListComponent,
    canActivate: [EndingPlacementOfExecutiveEngineerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EndingPlacementOfExecutiveEngineerNewComponent,
    canActivate: [EndingPlacementOfExecutiveEngineerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EndingPlacementOfExecutiveEngineerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EndingPlacementOfExecutiveEngineerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EndingPlacementOfExecutiveEngineerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EndingPlacementOfExecutiveEngineerRoutingModule {
}
