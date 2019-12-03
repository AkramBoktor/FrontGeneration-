import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IssuingASupplyOrderForASchoolListComponent } from './issuing-a-supply-order-for-a-school-list/issuing-a-supply-order-for-a-school-list.component';
import { IssuingASupplyOrderForASchoolEditComponent } from './issuing-a-supply-order-for-a-school-edit/issuing-a-supply-order-for-a-school-edit.component';
import { IssuingASupplyOrderForASchoolNewComponent } from './issuing-a-supply-order-for-a-school-new/issuing-a-supply-order-for-a-school-new.component';
import { IssuingASupplyOrderForASchoolViewComponent } from './issuing-a-supply-order-for-a-school-view/issuing-a-supply-order-for-a-school-view.component';
import { IssuingASupplyOrderForASchoolRoutingModule } from './issuing-a-supply-order-for-a-school.routing.module';
import { IssuingASupplyOrderForASchoolService } from './shared/issuing-a-supply-order-for-a-school.service';
import { IssuingASupplyOrderForASchoolGuard } from './shared/issuing-a-supply-order-for-a-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IssuingASupplyOrderForASchoolListComponent,
    IssuingASupplyOrderForASchoolNewComponent,
    IssuingASupplyOrderForASchoolEditComponent,
    IssuingASupplyOrderForASchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IssuingASupplyOrderForASchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IssuingASupplyOrderForASchoolService,
    IssuingASupplyOrderForASchoolGuard
  ],
  entryComponents: [
    IssuingASupplyOrderForASchoolNewComponent,
    IssuingASupplyOrderForASchoolEditComponent,
    IssuingASupplyOrderForASchoolViewComponent
  ]
})

export class IssuingASupplyOrderForASchoolModule {
}
