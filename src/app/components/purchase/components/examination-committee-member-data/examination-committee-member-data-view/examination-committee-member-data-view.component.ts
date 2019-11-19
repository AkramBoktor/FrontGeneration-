
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExaminationCommitteeMemberData } from 'app/shared/models/examination-committee-member-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExaminationCommitteeMemberDataService } from '../shared/examination-committee-member-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-examination-committee-member-data-view',
  templateUrl: './examination-committee-member-data-view.component.html',
  styleUrls: ['./examination-committee-member-data-view.component.scss'],
  providers: []
})

export class ExaminationCommitteeMemberDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationCommitteeMemberData: ExaminationCommitteeMemberData;
  examinationCommitteeMemberDataForm: FormGroup;

  private offeringTypesService: LookupService;
private membersService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
memberTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationCommitteeMemberDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeMemberDataViewComponent>,
    public examinationCommitteeMemberDataService: ExaminationCommitteeMemberDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  bidNumber : [this.selectedExaminationCommitteeMemberData.bidNumber],
  meetingNumber : [this.selectedExaminationCommitteeMemberData.meetingNumber],
  serialMember : [this.selectedExaminationCommitteeMemberData.serialMember],
  memberName : [this.selectedExaminationCommitteeMemberData.memberName],
  offeringType : [this.selectedExaminationCommitteeMemberData.offeringType],
  memberType : [this.selectedExaminationCommitteeMemberData.memberType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.examinationCommitteeMemberDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.examinationCommitteeMemberDataForm.controls)) {
      this.examinationCommitteeMemberDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.membersService = new LookupService('members', this.http);
  }
}

