
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Allowance } from 'app/shared/models/allowance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AllowanceEditComponent } from '../allowance-edit/allowance-edit.component';
import { AllowanceNewComponent } from '../allowance-new/allowance-new.component';
import { AllowanceViewComponent } from '../allowance-view/allowance-view.component';
import { AllowanceService } from '../shared/allowance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-allowance-list',
  templateUrl: './allowance-list.component.html',
  styleUrls: ['./allowance-list.component.scss'],
  providers: []
})

export class AllowanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAllowance: Allowance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'نوع البدل', field: '‎AllowancesType' }),
	new GridColumnOptions({ headerName: 'قيمه البدل', field: 'allowancesAmount' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AllowanceViewComponent,
    editDialogClassType: AllowanceEditComponent,
    newDialogClassType: AllowanceNewComponent,
  });
    constructor(
        injector: Injector,
        public allowanceService: AllowanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAllowance = new Allowance();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	year : []
    });

     
  }

  getAllowancesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Allowance[]> => {
    return this.allowanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.allowanceService.delete(param.data.id)
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

