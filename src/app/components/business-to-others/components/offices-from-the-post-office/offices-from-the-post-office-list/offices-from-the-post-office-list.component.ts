
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { OfficesFromThePostOffice } from 'app/shared/models/offices-from-the-post-office';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OfficesFromThePostOfficeEditComponent } from '../offices-from-the-post-office-edit/offices-from-the-post-office-edit.component';
import { OfficesFromThePostOfficeNewComponent } from '../offices-from-the-post-office-new/offices-from-the-post-office-new.component';
import { OfficesFromThePostOfficeViewComponent } from '../offices-from-the-post-office-view/offices-from-the-post-office-view.component';
import { OfficesFromThePostOfficeService } from '../shared/offices-from-the-post-office.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-offices-from-the-post-office-list',
  templateUrl: './offices-from-the-post-office-list.component.html',
  styleUrls: ['./offices-from-the-post-office-list.component.scss'],
  providers: []
})

export class OfficesFromThePostOfficeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOfficesFromThePostOffice: OfficesFromThePostOffice;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة ورود المكتب من هيئة البريد', field: 'postOfficeReceiptYear' }),
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'iD' }),
	new GridColumnOptions({ headerName: 'اسم المكتب', field: 'officeNmae' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OfficesFromThePostOfficeViewComponent,
    editDialogClassType: OfficesFromThePostOfficeEditComponent,
    newDialogClassType: OfficesFromThePostOfficeNewComponent,
  });
    constructor(
        injector: Injector,
        public officesFromThePostOfficeService: OfficesFromThePostOfficeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOfficesFromThePostOffice = new OfficesFromThePostOffice();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	iD : [],
	governorate : []
    });

     
  }

  getOfficesFromThePostOfficePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<OfficesFromThePostOffice[]> => {
    return this.officesFromThePostOfficeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.officesFromThePostOfficeService.delete(param.data.id)
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

