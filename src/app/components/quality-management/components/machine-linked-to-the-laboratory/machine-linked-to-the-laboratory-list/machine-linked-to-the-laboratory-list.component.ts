
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineLinkedToTheLaboratory } from 'app/shared/models/machine-linked-to-the-laboratory';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineLinkedToTheLaboratoryEditComponent } from '../machine-linked-to-the-laboratory-edit/machine-linked-to-the-laboratory-edit.component';
import { MachineLinkedToTheLaboratoryNewComponent } from '../machine-linked-to-the-laboratory-new/machine-linked-to-the-laboratory-new.component';
import { MachineLinkedToTheLaboratoryViewComponent } from '../machine-linked-to-the-laboratory-view/machine-linked-to-the-laboratory-view.component';
import { MachineLinkedToTheLaboratoryService } from '../shared/machine-linked-to-the-laboratory.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-linked-to-the-laboratory-list',
  templateUrl: './machine-linked-to-the-laboratory-list.component.html',
  styleUrls: ['./machine-linked-to-the-laboratory-list.component.scss'],
  providers: []
})

export class MachineLinkedToTheLaboratoryListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMachineLinkedToTheLaboratory: MachineLinkedToTheLaboratory;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الماكينة', field: 'machineCode' }),
	new GridColumnOptions({ headerName: 'اسم الماكينة', field: 'machineName' }),
	new GridColumnOptions({ headerName: 'كود المعمل', field: 'laboratoryCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MachineLinkedToTheLaboratoryViewComponent,
    editDialogClassType: MachineLinkedToTheLaboratoryEditComponent,
    newDialogClassType: MachineLinkedToTheLaboratoryNewComponent,
  });
    constructor(
        injector: Injector,
        public machineLinkedToTheLaboratoryService: MachineLinkedToTheLaboratoryService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMachineLinkedToTheLaboratory = new MachineLinkedToTheLaboratory();

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.searchForm = this.formBuilder.group({
     	machineCode : [],
	laboratoryCode : []
    });

     
  }

  getMachinesLinkedToTheLaboratoryPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MachineLinkedToTheLaboratory[]> => {
    return this.machineLinkedToTheLaboratoryService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.machineLinkedToTheLaboratoryService.delete(param.data.id)
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
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}

