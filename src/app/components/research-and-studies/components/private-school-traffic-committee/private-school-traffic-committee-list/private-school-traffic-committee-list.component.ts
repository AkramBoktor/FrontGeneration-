
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateSchoolTrafficCommittee } from 'app/shared/models/private-school-traffic-committee';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrivateSchoolTrafficCommitteeEditComponent } from '../private-school-traffic-committee-edit/private-school-traffic-committee-edit.component';
import { PrivateSchoolTrafficCommitteeNewComponent } from '../private-school-traffic-committee-new/private-school-traffic-committee-new.component';
import { PrivateSchoolTrafficCommitteeViewComponent } from '../private-school-traffic-committee-view/private-school-traffic-committee-view.component';
import { PrivateSchoolTrafficCommitteeService } from '../shared/private-school-traffic-committee.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-school-traffic-committee-list',
  templateUrl: './private-school-traffic-committee-list.component.html',
  styleUrls: ['./private-school-traffic-committee-list.component.scss'],
  providers: []
})

export class PrivateSchoolTrafficCommitteeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPrivateSchoolTrafficCommittee: PrivateSchoolTrafficCommittee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الملاحظة', field: 'noteCode' }),
	new GridColumnOptions({ headerName: 'الاجراءات', field: 'measures' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrivateSchoolTrafficCommitteeViewComponent,
    editDialogClassType: PrivateSchoolTrafficCommitteeEditComponent,
    newDialogClassType: PrivateSchoolTrafficCommitteeNewComponent,
  });
    constructor(
        injector: Injector,
        public privateSchoolTrafficCommitteeService: PrivateSchoolTrafficCommitteeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrivateSchoolTrafficCommittee = new PrivateSchoolTrafficCommittee();

    

    this.searchForm = this.formBuilder.group({
     	schoolCode : [],
	passageDate : []
    });

     
  }

  getPrivateSchoolTrafficCommitteesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrivateSchoolTrafficCommittee[]> => {
    return this.privateSchoolTrafficCommitteeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.privateSchoolTrafficCommitteeService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

