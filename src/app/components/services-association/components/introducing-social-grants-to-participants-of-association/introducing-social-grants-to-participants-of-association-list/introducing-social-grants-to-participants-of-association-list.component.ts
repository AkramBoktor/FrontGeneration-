
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingSocialGrantsToParticipantsOfAssociation } from 'app/shared/models/introducing-social-grants-to-participants-of-association';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingSocialGrantsToParticipantsOfAssociationEditComponent } from '../introducing-social-grants-to-participants-of-association-edit/introducing-social-grants-to-participants-of-association-edit.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationNewComponent } from '../introducing-social-grants-to-participants-of-association-new/introducing-social-grants-to-participants-of-association-new.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationViewComponent } from '../introducing-social-grants-to-participants-of-association-view/introducing-social-grants-to-participants-of-association-view.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationService } from '../shared/introducing-social-grants-to-participants-of-association.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-social-grants-to-participants-of-association-list',
  templateUrl: './introducing-social-grants-to-participants-of-association-list.component.html',
  styleUrls: ['./introducing-social-grants-to-participants-of-association-list.component.scss'],
  providers: []
})

export class IntroducingSocialGrantsToParticipantsOfAssociationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private statusCodesService: LookupService;

  
caseSelectOptions: MaterialSelectOptions;

  
	@ViewChild('case', { static: true }) CaseSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIntroducingSocialGrantsToParticipantsOfAssociation: IntroducingSocialGrantsToParticipantsOfAssociation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' رقم العضوية', field: 'membershipNo' }),
	new GridColumnOptions({ headerName: ' تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: ' قيمة الصرف', field: 'exchangeValue' }),
	new GridColumnOptions({ headerName: ' اسم المتوفي', field: 'deceasedName' }),
	new GridColumnOptions({ headerName: ' الحالة', field: 'case' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IntroducingSocialGrantsToParticipantsOfAssociationViewComponent,
    editDialogClassType: IntroducingSocialGrantsToParticipantsOfAssociationEditComponent,
    newDialogClassType: IntroducingSocialGrantsToParticipantsOfAssociationNewComponent,
  });
    constructor(
        injector: Injector,
        public introducingSocialGrantsToParticipantsOfAssociationService: IntroducingSocialGrantsToParticipantsOfAssociationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIntroducingSocialGrantsToParticipantsOfAssociation = new IntroducingSocialGrantsToParticipantsOfAssociation();

    
	this.caseSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNo : [],
	exchangeDate : [],
	exchangeValue : [],
	deceasedName : [],
	case : []
    });

     
  }

  getIntroducingSocialGrantsToParticipantsOfAssociationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IntroducingSocialGrantsToParticipantsOfAssociation[]> => {
    return this.introducingSocialGrantsToParticipantsOfAssociationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.introducingSocialGrantsToParticipantsOfAssociationService.delete(param.data.id)
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
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}

