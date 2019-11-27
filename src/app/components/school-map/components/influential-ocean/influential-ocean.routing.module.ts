import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InfluentialOceanGuard } from './shared/influential-ocean.guard';
import { InfluentialOceanNewComponent } from './influential-ocean-new/influential-ocean-new.component';
import { InfluentialOceanEditComponent } from './influential-ocean-edit/influential-ocean-edit.component';
import { InfluentialOceanListComponent } from './influential-ocean-list/influential-ocean-list.component';
import { InfluentialOceanViewComponent } from './influential-ocean-view/influential-ocean-view.component';

const routes: Routes = [
  {
    path: '',
    component: InfluentialOceanListComponent,
    canActivate: [InfluentialOceanGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InfluentialOceanNewComponent,
    canActivate: [InfluentialOceanGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InfluentialOceanEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InfluentialOceanListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InfluentialOceanViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InfluentialOceanRoutingModule {
}
