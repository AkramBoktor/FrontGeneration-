
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReleasingCustodyByTheAuthority } from 'app/shared/models/releasing-custody-by-the-authority';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReleasingCustodyByTheAuthorityEditComponent } from '../releasing-custody-by-the-authority-edit/releasing-custody-by-the-authority-edit.component';
import { ReleasingCustodyByTheAuthorityNewComponent } from '../releasing-custody-by-the-authority-new/releasing-custody-by-the-authority-new.component';
import { ReleasingCustodyByTheAuthorityViewComponent } from '../releasing-custody-by-the-authority-view/releasing-custody-by-the-authority-view.component';
import { ReleasingCustodyByTheAuthorityService } from '../shared/releasing-custody-by-the-authority.service';

@Component({
  selector: 'app-releasing-custody-by-the-authority-list',
  templateUrl: './releasing-custody-by-the-authority-list.component.html',
  styleUrls: ['./releasing-custody-by-the-authority-list.component.scss'],
  providers: []
})

export class ReleasingCustodyByTheAuthorityListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private powerTypesService: LookupService;
private powerCodesService: LookupService;

  
authorityTypeSelectOptions: MaterialSelectOptions;
authorityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('authorityType', { static: true }) AuthorityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('authorityCode', { static: true }) AuthorityCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedReleasingCustodyByTheAuthority: ReleasingCustodyByTheAuthority;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الصنف ', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'حاله الصنف', field: 'itemCondition' }),
	new GridColumnOptions({ headerName: 'اخر السعر ', field: 'lastPrice' }),
	new GridColumnOptions({ headerName: 'رقم المخزن ', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: 'رقم اذن الصرف', field: 'exchangeAuthorizationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'تاريخ الاسقاط ', field: 'projectionDate' }),
	new GridColumnOptions({ headerName: 'الكمية المرفوعة', field: 'quantityRaised' }),
	new GridColumnOptions({ headerName: 'نوع السلطة  ', field: 'authorityType' }),
	new GridColumnOptions({ headerName: 'كود السلطة', field: 'authorityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ReleasingCustodyByTheAuthorityViewComponent,
    editDialogClassType: ReleasingCustodyByTheAuthorityEditComponent,
    newDialogClassType: ReleasingCustodyByTheAuthorityNewComponent,
  });
    constructor(
        injector: Injector,
        public releasingCustodyByTheAuthorityService: ReleasingCustodyByTheAuthorityService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReleasingCustodyByTheAuthority = new ReleasingCustodyByTheAuthority();

    
	this.authorityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.powerTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السلطة  ',
	});

	this.authorityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.powerCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السلطة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	itemNo : [],
	itemCondition : [],
	storeNumber : [],
	exchangeAuthorizationNumber : [],
	exchangeDate : [],
	projectionDate : [],
	authorityType : [],
	authorityCode : []
    });

     
  }

  getReleasingCustodyByTheAuthorityPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ReleasingCustodyByTheAuthority[]> => {
    return this.releasingCustodyByTheAuthorityService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.releasingCustodyByTheAuthorityService.delete(param.data.id)
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
    this.powerTypesService = new LookupService('powertypes', this.http);
this.powerCodesService = new LookupService('powercodes', this.http);
  }
}

