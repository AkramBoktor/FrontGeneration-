
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheNumberOfApplicationReceivedInTheSamplesHall } from 'app/shared/models/the-number-of-application-received-in-the-samples-hall';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheNumberOfApplicationReceivedInTheSamplesHallEditComponent } from '../the-number-of-application-received-in-the-samples-hall-edit/the-number-of-application-received-in-the-samples-hall-edit.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallNewComponent } from '../the-number-of-application-received-in-the-samples-hall-new/the-number-of-application-received-in-the-samples-hall-new.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallViewComponent } from '../the-number-of-application-received-in-the-samples-hall-view/the-number-of-application-received-in-the-samples-hall-view.component';
import { TheNumberOfApplicationReceivedInTheSamplesHallService } from '../shared/the-number-of-application-received-in-the-samples-hall.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-number-of-application-received-in-the-samples-hall-list',
  templateUrl: './the-number-of-application-received-in-the-samples-hall-list.component.html',
  styleUrls: ['./the-number-of-application-received-in-the-samples-hall-list.component.scss'],
  providers: []
})

export class TheNumberOfApplicationReceivedInTheSamplesHallListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'Less',
	 errorMessage: ''
	}
      ];
  

  

  

  
  @Input() selectedTheNumberOfApplicationReceivedInTheSamplesHall: TheNumberOfApplicationReceivedInTheSamplesHall;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ ', field: 'date' }),
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'كود الماده الاساسية', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود المادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'العينة المختبرة', field: 'sampleTested' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheNumberOfApplicationReceivedInTheSamplesHallViewComponent,
    editDialogClassType: TheNumberOfApplicationReceivedInTheSamplesHallEditComponent,
    newDialogClassType: TheNumberOfApplicationReceivedInTheSamplesHallNewComponent,
  });
    constructor(
        injector: Injector,
        public theNumberOfApplicationReceivedInTheSamplesHallService: TheNumberOfApplicationReceivedInTheSamplesHallService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheNumberOfApplicationReceivedInTheSamplesHall = new TheNumberOfApplicationReceivedInTheSamplesHall();

    

    this.searchForm = this.formBuilder.group({
     	datefrom : [],
	orderNumber : [],
	testCode : [],
	dateTo : []}, {
	 validators: [
		 ValidatorFunctions.validateLess("DateTo","Datefrom")]
    });

     
  }

  getNumbersOfApplicationsReceivedInTheSamplesHallPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheNumberOfApplicationReceivedInTheSamplesHall[]> => {
    return this.theNumberOfApplicationReceivedInTheSamplesHallService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theNumberOfApplicationReceivedInTheSamplesHallService.delete(param.data.id)
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

