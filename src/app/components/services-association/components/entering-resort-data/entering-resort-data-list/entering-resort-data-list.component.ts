
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EnteringResortData } from 'app/shared/models/entering-resort-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnteringResortDataEditComponent } from '../entering-resort-data-edit/entering-resort-data-edit.component';
import { EnteringResortDataNewComponent } from '../entering-resort-data-new/entering-resort-data-new.component';
import { EnteringResortDataViewComponent } from '../entering-resort-data-view/entering-resort-data-view.component';
import { EnteringResortDataService } from '../shared/entering-resort-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-entering-resort-data-list',
  templateUrl: './entering-resort-data-list.component.html',
  styleUrls: ['./entering-resort-data-list.component.scss'],
  providers: []
})

export class EnteringResortDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedEnteringResortData: EnteringResortData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: ' رقم العضوية', field: 'membershipNo' }),
	new GridColumnOptions({ headerName: ' مكان المصيف', field: 'resortPlace' }),
	new GridColumnOptions({ headerName: '          تاريخ بداية المصيف', field: 'resortStartDate' }),
	new GridColumnOptions({ headerName: ' تاريخ  نهاية المصيف', field: 'resortEndDate' }),
	new GridColumnOptions({ headerName: ' رقم الدور', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: '  رقم الشقة', field: 'apartmentNumber' }),
	new GridColumnOptions({ headerName: ' قيمة المصيف', field: 'resortValue' }),
	new GridColumnOptions({ headerName: ' قيمة التامين ', field: 'insuranceValue' }),
	new GridColumnOptions({ headerName: ' مصاريف التامين', field: 'insuranceExpenses' }),
	new GridColumnOptions({ headerName: ' عدد المرافقين', field: 'companionsNumber' }),
	new GridColumnOptions({ headerName: ' قيمة خصم التامين', field: 'insuranceDeductionValue' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EnteringResortDataViewComponent,
    editDialogClassType: EnteringResortDataEditComponent,
    newDialogClassType: EnteringResortDataNewComponent,
  });
    constructor(
        injector: Injector,
        public enteringResortDataService: EnteringResortDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEnteringResortData = new EnteringResortData();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : [],
	membershipNo : [],
	resortPlace : [],
	resortStartDate : [],
	resortEndDate : [],
	floorNumber : [],
	apartmentNumber : [],
	resortValue : [],
	insuranceValue : [],
	insuranceExpenses : [],
	companionsNumber : [],
	insuranceDeductionValue : []
    });

     
  }

  getEnteringResortDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EnteringResortData[]> => {
    return this.enteringResortDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.enteringResortDataService.delete(param.data.id)
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

