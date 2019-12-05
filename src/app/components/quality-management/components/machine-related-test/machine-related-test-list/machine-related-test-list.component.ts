
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineRelatedTest } from 'app/shared/models/machine-related-test';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineRelatedTestEditComponent } from '../machine-related-test-edit/machine-related-test-edit.component';
import { MachineRelatedTestNewComponent } from '../machine-related-test-new/machine-related-test-new.component';
import { MachineRelatedTestViewComponent } from '../machine-related-test-view/machine-related-test-view.component';
import { MachineRelatedTestService } from '../shared/machine-related-test.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-related-test-list',
  templateUrl: './machine-related-test-list.component.html',
  styleUrls: ['./machine-related-test-list.component.scss'],
  providers: []
})

export class MachineRelatedTestListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedMachineRelatedTest: MachineRelatedTest;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الماكينة', field: 'machineCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MachineRelatedTestViewComponent,
    editDialogClassType: MachineRelatedTestEditComponent,
    newDialogClassType: MachineRelatedTestNewComponent,
  });
    constructor(
        injector: Injector,
        public machineRelatedTestService: MachineRelatedTestService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMachineRelatedTest = new MachineRelatedTest();

    

    this.searchForm = this.formBuilder.group({
     	machineCode : [],
	testCode : []
    });

     
  }

  getMachineRelatedTestsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MachineRelatedTest[]> => {
    return this.machineRelatedTestService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.machineRelatedTestService.delete(param.data.id)
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

