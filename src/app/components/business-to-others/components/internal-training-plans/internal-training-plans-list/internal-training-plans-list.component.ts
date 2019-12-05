
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InternalTrainingPlans } from 'app/shared/models/internal-training-plans';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InternalTrainingPlansEditComponent } from '../internal-training-plans-edit/internal-training-plans-edit.component';
import { InternalTrainingPlansNewComponent } from '../internal-training-plans-new/internal-training-plans-new.component';
import { InternalTrainingPlansViewComponent } from '../internal-training-plans-view/internal-training-plans-view.component';
import { InternalTrainingPlansService } from '../shared/internal-training-plans.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-internal-training-plans-list',
  templateUrl: './internal-training-plans-list.component.html',
  styleUrls: ['./internal-training-plans-list.component.scss'],
  providers: []
})

export class InternalTrainingPlansListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;

  
administrationOrBranchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranchCode', { static: true }) AdministrationOrBranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedInternalTrainingPlans: InternalTrainingPlans;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'التاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: 'رقم التدريب', field: 'trainingNumber' }),
	new GridColumnOptions({ headerName: 'موضوع التدريب', field: 'trainingTopic' }),
	new GridColumnOptions({ headerName: 'كود الادارة او الفرع', field: 'administrationOrBranchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InternalTrainingPlansViewComponent,
    editDialogClassType: InternalTrainingPlansEditComponent,
    newDialogClassType: InternalTrainingPlansNewComponent,
  });
    constructor(
        injector: Injector,
        public internalTrainingPlansService: InternalTrainingPlansService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInternalTrainingPlans = new InternalTrainingPlans();

    
	this.administrationOrBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة او الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	date : [],
	trainingNumber : [],
	administrationOrBranchCode : []
    });

     
  }

  getInternalTrainingPlansPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InternalTrainingPlans[]> => {
    return this.internalTrainingPlansService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.internalTrainingPlansService.delete(param.data.id)
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

