
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAssignmentDataForLiftingAndInspectionCommittees } from 'app/shared/models/land-assignment-data-for-lifting-and-inspection-committees';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent } from '../land-assignment-data-for-lifting-and-inspection-committees-edit/land-assignment-data-for-lifting-and-inspection-committees-edit.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent } from '../land-assignment-data-for-lifting-and-inspection-committees-new/land-assignment-data-for-lifting-and-inspection-committees-new.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent } from '../land-assignment-data-for-lifting-and-inspection-committees-view/land-assignment-data-for-lifting-and-inspection-committees-view.component';
import { LandAssignmentDataForLiftingAndInspectionCommitteesService } from '../shared/land-assignment-data-for-lifting-and-inspection-committees.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-assignment-data-for-lifting-and-inspection-committees-list',
  templateUrl: './land-assignment-data-for-lifting-and-inspection-committees-list.component.html',
  styleUrls: ['./land-assignment-data-for-lifting-and-inspection-committees-list.component.scss'],
  providers: []
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private committeeTypeCodesService: LookupService;

  
committeeTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeType', { static: true }) CommitteeTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLandAssignmentDataForLiftingAndInspectionCommittees: LandAssignmentDataForLiftingAndInspectionCommittees;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ التشكيل', field: 'formationDate' }),
	new GridColumnOptions({ headerName: 'رقم اللجنة', field: 'committeeNumber' }),
	new GridColumnOptions({ headerName: 'رقم قطعة الارض', field: 'landNumber' }),
	new GridColumnOptions({ headerName: 'اسم قطعة الارض', field: 'landName' }),
	new GridColumnOptions({ headerName: 'تاريخ الاسناد', field: 'referenceDate' }),
	new GridColumnOptions({ headerName: 'نوع اللجنة', field: 'committeeType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent,
    editDialogClassType: LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent,
    newDialogClassType: LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent,
  });
    constructor(
        injector: Injector,
        public landAssignmentDataForLiftingAndInspectionCommitteesService: LandAssignmentDataForLiftingAndInspectionCommitteesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLandAssignmentDataForLiftingAndInspectionCommittees = new LandAssignmentDataForLiftingAndInspectionCommittees();

    
	this.committeeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنة',
	});


    this.searchForm = this.formBuilder.group({
     	formationDate : [],
	committeeNumber : [],
	landNumber : [],
	landName : [],
	referenceDate : [],
	committeeType : []
    });

     
  }

  getLandAssignmentDataForLiftingAndInspectionCommitteesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LandAssignmentDataForLiftingAndInspectionCommittees[]> => {
    return this.landAssignmentDataForLiftingAndInspectionCommitteesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.landAssignmentDataForLiftingAndInspectionCommitteesService.delete(param.data.id)
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
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
}

