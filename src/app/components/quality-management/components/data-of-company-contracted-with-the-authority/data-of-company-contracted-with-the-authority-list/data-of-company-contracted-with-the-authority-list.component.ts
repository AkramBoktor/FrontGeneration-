
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfCompanyContractedWithTheAuthority } from 'app/shared/models/data-of-company-contracted-with-the-authority';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfCompanyContractedWithTheAuthorityEditComponent } from '../data-of-company-contracted-with-the-authority-edit/data-of-company-contracted-with-the-authority-edit.component';
import { DataOfCompanyContractedWithTheAuthorityNewComponent } from '../data-of-company-contracted-with-the-authority-new/data-of-company-contracted-with-the-authority-new.component';
import { DataOfCompanyContractedWithTheAuthorityViewComponent } from '../data-of-company-contracted-with-the-authority-view/data-of-company-contracted-with-the-authority-view.component';
import { DataOfCompanyContractedWithTheAuthorityService } from '../shared/data-of-company-contracted-with-the-authority.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-company-contracted-with-the-authority-list',
  templateUrl: './data-of-company-contracted-with-the-authority-list.component.html',
  styleUrls: ['./data-of-company-contracted-with-the-authority-list.component.scss'],
  providers: []
})

export class DataOfCompanyContractedWithTheAuthorityListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private mainActivitiesService: LookupService;
private mainBranchCodeService: LookupService;

  
mainActivitySelectOptions: MaterialSelectOptions;
mainBranchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainActivity', { static: true }) MainActivitySelectComponent: MaterialSelectComponent;
	@ViewChild('mainBranchCode', { static: true }) MainBranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataOfCompanyContractedWithTheAuthority: DataOfCompanyContractedWithTheAuthority;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ نهاية العقد', field: 'contractEndingDate' }),
	new GridColumnOptions({ headerName: 'كود الشركة', field: 'companyCode' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'عنوان الشركة', field: 'companyAddress' }),
	new GridColumnOptions({ headerName: 'تليفون الشركة', field: 'companyTelephon' }),
	new GridColumnOptions({ headerName: 'رقم المحل التجاري', field: 'shopNumber' }),
	new GridColumnOptions({ headerName: 'ملف رقم', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'البطاقة الضريبية', field: 'taxCardNumber' }),
	new GridColumnOptions({ headerName: 'ممثل الشركة', field: 'companyPresenter' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية العقد', field: 'contractStartingDate' }),
	new GridColumnOptions({ headerName: 'النشاط الأساسي', field: 'mainActivity' }),
	new GridColumnOptions({ headerName: 'مامورية الضرائب', field: 'mamoriaTax' }),
	new GridColumnOptions({ headerName: 'صفته', field: 'adjective' }),
	new GridColumnOptions({ headerName: 'كود الفرع الرئيسي', field: 'mainBranchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataOfCompanyContractedWithTheAuthorityViewComponent,
    editDialogClassType: DataOfCompanyContractedWithTheAuthorityEditComponent,
    newDialogClassType: DataOfCompanyContractedWithTheAuthorityNewComponent,
  });
    constructor(
        injector: Injector,
        public dataOfCompanyContractedWithTheAuthorityService: DataOfCompanyContractedWithTheAuthorityService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataOfCompanyContractedWithTheAuthority = new DataOfCompanyContractedWithTheAuthority();

    
	this.mainActivitySelectOptions = new MaterialSelectOptions({
	 data: this.mainActivitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'النشاط الأساسي',
	});

	this.mainBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainBranchCodeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع الرئيسي',
	});


    this.searchForm = this.formBuilder.group({
     	companyCode : [],
	companyName : [],
	companyTelephon : [],
	shopNumber : [],
	mainActivity : [],
	mainBranchCode : []
    });

     
  }

  getDataOfCompaniesContractedWithTheAuthorityPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataOfCompanyContractedWithTheAuthority[]> => {
    return this.dataOfCompanyContractedWithTheAuthorityService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataOfCompanyContractedWithTheAuthorityService.delete(param.data.id)
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
    this.mainActivitiesService = new LookupService('mainactivities', this.http);
this.mainBranchCodeService = new LookupService('mainbranchcodes', this.http);
  }
}

