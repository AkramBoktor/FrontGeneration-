
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePositionOfTheOfficesReceivedFromThePostOffice } from 'app/shared/models/the-position-of-the-offices-received-from-the-post-office';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent } from '../the-position-of-the-offices-received-from-the-post-office-edit/the-position-of-the-offices-received-from-the-post-office-edit.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent } from '../the-position-of-the-offices-received-from-the-post-office-new/the-position-of-the-offices-received-from-the-post-office-new.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent } from '../the-position-of-the-offices-received-from-the-post-office-view/the-position-of-the-offices-received-from-the-post-office-view.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeService } from '../shared/the-position-of-the-offices-received-from-the-post-office.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-position-of-the-offices-received-from-the-post-office-list',
  templateUrl: './the-position-of-the-offices-received-from-the-post-office-list.component.html',
  styleUrls: ['./the-position-of-the-offices-received-from-the-post-office-list.component.scss'],
  providers: []
})

export class ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedThePositionOfTheOfficesReceivedFromThePostOffice: ThePositionOfTheOfficesReceivedFromThePostOffice;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة ورود المكتب من هيئة البريد', field: 'postOfficeReceiptYear' }),
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'iD' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'المكتب ملغي او مؤجل', field: 'officeIsCanceledOrDeferred' }),
	new GridColumnOptions({ headerName: 'المكتب مكرر', field: 'duplicatedOffice' }),
	new GridColumnOptions({ headerName: 'غير قابل للتطوير', field: 'undeveloped' }),
	new GridColumnOptions({ headerName: 'موقف الرفع المساحي', field: 'surveyingStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent,
    editDialogClassType: ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent,
    newDialogClassType: ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent,
  });
    constructor(
        injector: Injector,
        public thePositionOfTheOfficesReceivedFromThePostOfficeService: ThePositionOfTheOfficesReceivedFromThePostOfficeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedThePositionOfTheOfficesReceivedFromThePostOffice = new ThePositionOfTheOfficesReceivedFromThePostOffice();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	postOfficeReceiptYear : [],
	iD : [],
	governorate : []
    });

     
  }

  getThePositionOfTheOfficesReceivedFromThePostOfficePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ThePositionOfTheOfficesReceivedFromThePostOffice[]> => {
    return this.thePositionOfTheOfficesReceivedFromThePostOfficeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.thePositionOfTheOfficesReceivedFromThePostOfficeService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

