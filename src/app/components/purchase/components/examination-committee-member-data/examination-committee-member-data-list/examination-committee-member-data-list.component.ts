
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExaminationCommitteeMemberData } from 'app/shared/models/examination-committee-member-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExaminationCommitteeMemberDataEditComponent } from '../examination-committee-member-data-edit/examination-committee-member-data-edit.component';
import { ExaminationCommitteeMemberDataNewComponent } from '../examination-committee-member-data-new/examination-committee-member-data-new.component';
import { ExaminationCommitteeMemberDataViewComponent } from '../examination-committee-member-data-view/examination-committee-member-data-view.component';
import { ExaminationCommitteeMemberDataService } from '../shared/examination-committee-member-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-examination-committee-member-data-list',
  templateUrl: './examination-committee-member-data-list.component.html',
  styleUrls: ['./examination-committee-member-data-list.component.scss'],
  providers: []
})

export class ExaminationCommitteeMemberDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExaminationCommitteeMemberData: ExaminationCommitteeMemberData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم الاجتماع', field: 'meetingNumber' }),
	new GridColumnOptions({ headerName: 'مسلسل العضو', field: 'serialMember' }),
	new GridColumnOptions({ headerName: 'اسم العضو', field: 'memberName' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع العضو', field: 'memberType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExaminationCommitteeMemberDataViewComponent,
    editDialogClassType: ExaminationCommitteeMemberDataEditComponent,
    newDialogClassType: ExaminationCommitteeMemberDataNewComponent,
  });
    constructor(
        injector: Injector,
        public examinationCommitteeMemberDataService: ExaminationCommitteeMemberDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeMemberData = new ExaminationCommitteeMemberData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.memberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.membersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العضو',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	meetingNumber : [],
	serialMember : [],
	memberName : [],
	offeringType : [],
	memberType : []
    });

     
  }

  getExaminationCommitteeMembersDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExaminationCommitteeMemberData[]> => {
    return this.examinationCommitteeMemberDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.examinationCommitteeMemberDataService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
}

