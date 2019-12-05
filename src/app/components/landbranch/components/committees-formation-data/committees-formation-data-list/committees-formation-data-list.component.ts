
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CommitteesFormationData } from 'app/shared/models/committees-formation-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CommitteesFormationDataEditComponent } from '../committees-formation-data-edit/committees-formation-data-edit.component';
import { CommitteesFormationDataNewComponent } from '../committees-formation-data-new/committees-formation-data-new.component';
import { CommitteesFormationDataViewComponent } from '../committees-formation-data-view/committees-formation-data-view.component';
import { CommitteesFormationDataService } from '../shared/committees-formation-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-committees-formation-data-list',
  templateUrl: './committees-formation-data-list.component.html',
  styleUrls: ['./committees-formation-data-list.component.scss'],
  providers: []
})

export class CommitteesFormationDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private committeeTypeCodesService: LookupService;

  
committeeTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeTypeCode', { static: true }) CommitteeTypeCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCommitteesFormationData: CommitteesFormationData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ التشكيل', field: 'formationDate' }),
	new GridColumnOptions({ headerName: 'رقم الجنة', field: 'committeeNumber' }),
	new GridColumnOptions({ headerName: 'رقم عضو الجنة', field: 'committeeMemberNumber' }),
	new GridColumnOptions({ headerName: 'نوع اللجنه', field: 'committeeTypeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CommitteesFormationDataViewComponent,
    editDialogClassType: CommitteesFormationDataEditComponent,
    newDialogClassType: CommitteesFormationDataNewComponent,
  });
    constructor(
        injector: Injector,
        public committeesFormationDataService: CommitteesFormationDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCommitteesFormationData = new CommitteesFormationData();

    
	this.committeeTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنه',
	});


    this.searchForm = this.formBuilder.group({
     	formationDate : [],
	committeeNumber : [],
	committeeMemberNumber : [],
	committeeTypeCode : []
    });

     
  }

  getCommitteesFormationDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CommitteesFormationData[]> => {
    return this.committeesFormationDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.committeesFormationDataService.delete(param.data.id)
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

