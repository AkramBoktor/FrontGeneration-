
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EnvelopesOpennigCommetyMembersData } from 'app/shared/models/envelopes-opennig-commety-members-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnvelopesOpennigCommetyMembersDataEditComponent } from '../envelopes-opennig-commety-members-data-edit/envelopes-opennig-commety-members-data-edit.component';
import { EnvelopesOpennigCommetyMembersDataNewComponent } from '../envelopes-opennig-commety-members-data-new/envelopes-opennig-commety-members-data-new.component';
import { EnvelopesOpennigCommetyMembersDataViewComponent } from '../envelopes-opennig-commety-members-data-view/envelopes-opennig-commety-members-data-view.component';
import { EnvelopesOpennigCommetyMembersDataService } from '../shared/envelopes-opennig-commety-members-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-envelopes-opennig-commety-members-data-list',
  templateUrl: './envelopes-opennig-commety-members-data-list.component.html',
  styleUrls: ['./envelopes-opennig-commety-members-data-list.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyMembersDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEnvelopesOpennigCommetyMembersData: EnvelopesOpennigCommetyMembersData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'مسلسل العضو', field: 'serialMember' }),
	new GridColumnOptions({ headerName: 'اسم العضو', field: 'memberName' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع العضو', field: 'memberType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EnvelopesOpennigCommetyMembersDataViewComponent,
    editDialogClassType: EnvelopesOpennigCommetyMembersDataEditComponent,
    newDialogClassType: EnvelopesOpennigCommetyMembersDataNewComponent,
  });
    constructor(
        injector: Injector,
        public envelopesOpennigCommetyMembersDataService: EnvelopesOpennigCommetyMembersDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyMembersData = new EnvelopesOpennigCommetyMembersData();

    
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
	serialMember : [],
	memberName : [],
	offeringType : [],
	memberType : []
    });

     
  }

  getEnvelopesOpennigCommetyMembersDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EnvelopesOpennigCommetyMembersData[]> => {
    return this.envelopesOpennigCommetyMembersDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.envelopesOpennigCommetyMembersDataService.delete(param.data.id)
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

