import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/shared/pages/profile/profile.service';
import { ProfileComponent } from 'app/shared/pages/profile/profile.component';
import { EmployeeInfoComponent } from './tabs/employee-info/employee-info.component';
import { VacationInfoComponent } from './tabs/vacation-info/vacation-info.component';
import { CommonModule } from '@angular/common';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { VacationEmployeeService } from 'app/components/vacation/components/vacation-employee/shared/vacation-employee.service';
import { EmployeeDataService } from 'app/components/employee/components/employee-data/shared/employee-data.service';


 const routes = [
    {
        path     : '',
        component: ProfileComponent,
        
     }
 ];

@NgModule({
    declarations: [
        ProfileComponent,
        EmployeeInfoComponent,
        VacationInfoComponent
    ],
    imports     : [
         RouterModule.forChild(routes),
         MaterialControlsModule,
        CommonPipesModule,
        GridControlModule,
        NewFormLayoutModule,
        SearchListExpansionPanelModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        EmployeeDataService,
        VacationEmployeeService,
        ProfileService
    ]
})
export class ProfileModule
{
}
