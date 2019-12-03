
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorDataQualityManagement } from 'app/shared/models/contractor-data-quality-management';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDataQualityManagementEditComponent } from '../contractor-data-quality-management-edit/contractor-data-quality-management-edit.component';
import { ContractorDataQualityManagementNewComponent } from '../contractor-data-quality-management-new/contractor-data-quality-management-new.component';
import { ContractorDataQualityManagementViewComponent } from '../contractor-data-quality-management-view/contractor-data-quality-management-view.component';
import { ContractorDataQualityManagementService } from '../shared/contractor-data-quality-management.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-data-quality-management-list',
  templateUrl: './contractor-data-quality-management-list.component.html',
  styleUrls: ['./contractor-data-quality-management-list.component.scss'],
  providers: []
})

export class ContractorDataQualityManagementListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedContractorDataQualityManagement: ContractorDataQualityManagement;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorDataQualityManagementViewComponent,
    editDialogClassType: ContractorDataQualityManagementEditComponent,
    newDialogClassType: ContractorDataQualityManagementNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorDataQualityManagementService: ContractorDataQualityManagementService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractorDataQualityManagement = new ContractorDataQualityManagement();

    

    this.searchForm = this.formBuilder.group({
     	contractorCode : [],
       contractorName : []
    });

     
  }

  getContractorsDataQualityManagementPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorDataQualityManagement[]> => {
    return this.contractorDataQualityManagementService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorDataQualityManagementService.delete(param.data.id)
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

