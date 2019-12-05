import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-list/the-date-of-education-for-a-supply-order-issued-to-a-school-list.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-edit/the-date-of-education-for-a-supply-order-issued-to-a-school-edit.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-new/the-date-of-education-for-a-supply-order-issued-to-a-school-new.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-view/the-date-of-education-for-a-supply-order-issued-to-a-school-view.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolRoutingModule } from './the-date-of-education-for-a-supply-order-issued-to-a-school.routing.module';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolService } from './shared/the-date-of-education-for-a-supply-order-issued-to-a-school.service';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolGuard } from './shared/the-date-of-education-for-a-supply-order-issued-to-a-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent,
    TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent,
    TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent,
    TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheDateOfEducationForASupplyOrderIssuedToASchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheDateOfEducationForASupplyOrderIssuedToASchoolService,
    TheDateOfEducationForASupplyOrderIssuedToASchoolGuard
  ],
  entryComponents: [
    TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent,
    TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent,
    TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent
  ]
})

export class TheDateOfEducationForASupplyOrderIssuedToASchoolModule {
}
