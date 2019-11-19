
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExaminationCommitteeDateData } from 'app/shared/models/examination-committee-date-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExaminationCommitteeDateDataService } from '../shared/examination-committee-date-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-examination-committee-date-data-view',
  templateUrl: './examination-committee-date-data-view.component.html',
  styleUrls: ['./examination-committee-date-data-view.component.scss'],
  providers: []
})

export class ExaminationCommitteeDateDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationCommitteeDateData: ExaminationCommitteeDateData;
  examinationCommitteeDateDataForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationCommitteeDateDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeDateDataViewComponent>,
    public examinationCommitteeDateDataService: ExaminationCommitteeDateDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeDateData = this.selectedExaminationCommitteeDateDataDialog.data || this.selectedExaminationCommitteeDateData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.examinationCommitteeDateDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedExaminationCommitteeDateData.bidNumber],
  meetingNumber : [this.selectedExaminationCommitteeDateData.meetingNumber],
  committeeDate : [this.selectedExaminationCommitteeDateData.committeeDate],
  committeeHeadquarters : [this.selectedExaminationCommitteeDateData.committeeHeadquarters],
  approvalFormationDate : [this.selectedExaminationCommitteeDateData.approvalFormationDate],
  offeringProcedures : [this.selectedExaminationCommitteeDateData.offeringProcedures],
  offeringType : [this.selectedExaminationCommitteeDateData.offeringType]
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
    return this.examinationCommitteeDateDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.examinationCommitteeDateDataForm.controls)) {
      this.examinationCommitteeDateDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

