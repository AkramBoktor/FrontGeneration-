
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExaminationCommitteeMemberData } from 'app/shared/models/examination-committee-member-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExaminationCommitteeMemberDataService } from '../shared/examination-committee-member-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-committee-member-data-new',
  templateUrl: './examination-committee-member-data-new.component.html',
  styleUrls: ['./examination-committee-member-data-new.component.scss'],
  providers: [
    ]
})

export class ExaminationCommitteeMemberDataNewComponent extends AppBaseComponent implements OnInit {
  examinationCommitteeMemberDataForm: FormGroup;
  @Input() selectedExaminationCommitteeMemberData: ExaminationCommitteeMemberData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeMemberDataNewComponent>,
    public examinationCommitteeMemberDataService: ExaminationCommitteeMemberDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
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


    this.examinationCommitteeMemberDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedExaminationCommitteeMemberData.bidNumber, [ Validators.required ]],
  meetingNumber : [this.selectedExaminationCommitteeMemberData.meetingNumber, [ Validators.required ]],
  serialMember : [this.selectedExaminationCommitteeMemberData.serialMember, [ Validators.required ]],
  memberName : [this.selectedExaminationCommitteeMemberData.memberName, [ ]],
  offeringType : [this.selectedExaminationCommitteeMemberData.offeringType, [ Validators.required ]],
  memberType : [this.selectedExaminationCommitteeMemberData.memberType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.examinationCommitteeMemberDataService.create(this.examinationCommitteeMemberDataForm.value)
        .pipe(switchMap(x => {
			return this.examinationCommitteeMemberDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.examinationCommitteeMemberDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
 }
