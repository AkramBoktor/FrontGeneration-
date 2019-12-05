
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LabData } from 'app/shared/models/lab-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LabDataEditComponent } from '../lab-data-edit/lab-data-edit.component';
import { LabDataNewComponent } from '../lab-data-new/lab-data-new.component';
import { LabDataViewComponent } from '../lab-data-view/lab-data-view.component';
import { LabDataService } from '../shared/lab-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-lab-data-list',
  templateUrl: './lab-data-list.component.html',
  styleUrls: ['./lab-data-list.component.scss'],
  providers: []
})

export class LabDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLabData: LabData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المعمل', field: 'laboratoryCode' }),
	new GridColumnOptions({ headerName: 'عنوان المعمل', field: 'laboratoryAddress' }),
	new GridColumnOptions({ headerName: 'تليفون العمل', field: 'workPhone' }),
	new GridColumnOptions({ headerName: 'مدير المعمل', field: 'laboratoryManger' }),
	new GridColumnOptions({ headerName: 'مادة أساسية', field: 'basicMatrial' }),
	new GridColumnOptions({ headerName: 'مادة فرعية ', field: 'subMatrial' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testingCode' }),
	new GridColumnOptions({ headerName: 'اسم الاختبار', field: 'testingName' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'موجود ', field: 'existing' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LabDataViewComponent,
    editDialogClassType: LabDataEditComponent,
    newDialogClassType: LabDataNewComponent,
  });
    constructor(
        injector: Injector,
        public labDataService: LabDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLabData = new LabData();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	laboratoryCode : [],
	testingCode : [],
	branchCode : []
    });

     
  }

  getLabsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LabData[]> => {
    return this.labDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.labDataService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

