
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GrantInformation } from 'app/shared/models/grant-information';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GrantInformationEditComponent } from '../grant-information-edit/grant-information-edit.component';
import { GrantInformationNewComponent } from '../grant-information-new/grant-information-new.component';
import { GrantInformationViewComponent } from '../grant-information-view/grant-information-view.component';
import { GrantInformationService } from '../shared/grant-information.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-grant-information-list',
  templateUrl: './grant-information-list.component.html',
  styleUrls: ['./grant-information-list.component.scss'],
  providers: []
})

export class GrantInformationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedGrantInformation: GrantInformation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  كود المنحة', field: 'grantCode' }),
	new GridColumnOptions({ headerName: '  اسم المنحة', field: 'grantName' }),
	new GridColumnOptions({ headerName: 'كود الجهة المانحة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'عدد المدراس', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: ' نسبة المساهمة', field: 'contributionRatio' }),
	new GridColumnOptions({ headerName: '  تاريخ بداية المنحة', field: 'grantStartdate' }),
	new GridColumnOptions({ headerName: '   تاريخ نهاية المنحة', field: 'grantEndDate' }),
	new GridColumnOptions({ headerName: ' جملة المبلغ', field: 'totalAmount' }),
	new GridColumnOptions({ headerName: 'نوع الطرح ', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GrantInformationViewComponent,
    editDialogClassType: GrantInformationEditComponent,
    newDialogClassType: GrantInformationNewComponent,
  });
    constructor(
        injector: Injector,
        public grantInformationService: GrantInformationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGrantInformation = new GrantInformation();

    

    this.searchForm = this.formBuilder.group({
     	grantCode : []
    });

     
  }

  getGrantInformationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GrantInformation[]> => {
    return this.grantInformationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.grantInformationService.delete(param.data.id)
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

