import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorRankingDataGuard } from './shared/contractor-ranking-data.guard';
import { ContractorRankingDataNewComponent } from './contractor-ranking-data-new/contractor-ranking-data-new.component';
import { ContractorRankingDataEditComponent } from './contractor-ranking-data-edit/contractor-ranking-data-edit.component';
import { ContractorRankingDataListComponent } from './contractor-ranking-data-list/contractor-ranking-data-list.component';
import { ContractorRankingDataViewComponent } from './contractor-ranking-data-view/contractor-ranking-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorRankingDataListComponent,
    canActivate: [ContractorRankingDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorRankingDataNewComponent,
    canActivate: [ContractorRankingDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorRankingDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorRankingDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorRankingDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorRankingDataRoutingModule {
}
