
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExaminationCommitteeMemberData } from 'app/shared/models/examination-committee-member-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExaminationCommitteeMemberDataService } from '../shared/examination-committee-member-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-committee-member-data-edit',
  templateUrl: './examination-committee-member-data-edit.component.html',
  styleUrls: ['./examination-committee-member-data-edit.component.scss'],
  providers: []
})

export class ExaminationCommitteeMemberDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationCommitteeMemberData: ExaminationCommitteeMemberData;
  examinationCommitteeMemberDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('memberType', { static: true }) MemberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationCommitteeMemberDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeMemberDataEditComponent>,
    public examinationCommitteeMemberDataService: ExaminationCommitteeMemberDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeMemberData = new ExaminationCommitteeMemberData();
    this.selectedExaminationCommitteeMemberData = this.selectedExaminationCommitteeMemberDataDialog.data || this.selectedExaminationCommitteeMemberData;

    
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
      
  id : [this.selectedExaminationCommitteeMemberData.id],
  bidNumber : [this.selectedExaminationCommitteeMemberData.bidNumber, [ Validators.required ]],
  meetingNumber : [this.selectedExaminationCommitteeMemberData.meetingNumber, [ Validators.required ]],
  serialMember : [this.selectedExaminationCommitteeMemberData.serialMember, [ Validators.required ]],
  memberName : [this.selectedExaminationCommitteeMemberData.memberName, [ Validators.required ]],
  offeringType : [this.selectedExaminationCommitteeMemberData.offeringType, [ Validators.required ]],
  memberType : [this.selectedExaminationCommitteeMemberData.memberType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.examinationCommitteeMemberDataService.update(this.examinationCommitteeMemberDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.examinationCommitteeMemberDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.examinationCommitteeMemberDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
}
