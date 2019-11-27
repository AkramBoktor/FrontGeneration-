
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Gate } from 'app/shared/models/gate';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GateEditComponent } from '../gate-edit/gate-edit.component';
import { GateNewComponent } from '../gate-new/gate-new.component';
import { GateViewComponent } from '../gate-view/gate-view.component';
import { GateService } from '../shared/gate.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-gate-list',
  templateUrl: './gate-list.component.html',
  styleUrls: ['./gate-list.component.scss'],
  providers: []
})

export class GateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private gatesQualityCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
gatesQualityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('gatesQualityCode', { static: true }) GatesQualityCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGate: Gate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'مسلسل البوابات', field: 'gatesSerial' }),
	new GridColumnOptions({ headerName: 'مواقع البوابات', field: 'gatesSites' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود نوعية البوابات', field: 'gatesQualityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GateViewComponent,
    editDialogClassType: GateEditComponent,
    newDialogClassType: GateNewComponent,
  });
    constructor(
        injector: Injector,
        public gateService: GateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGate = new Gate();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.gatesQualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.gatesQualityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوعية البوابات',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	regionalCenterCode : [],
	branchCode : [],
	gatesQualityCode : []
    });

     
  }

  getGatesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Gate[]> => {
    return this.gateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.gateService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.gatesQualityCodesService = new LookupService('gatesqualitycodes', this.http);
  }
}

