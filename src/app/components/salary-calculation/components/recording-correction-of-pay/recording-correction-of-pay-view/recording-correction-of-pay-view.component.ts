
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordingCorrectionOfPay } from 'app/shared/models/recording-correction-of-pay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingCorrectionOfPayService } from '../shared/recording-correction-of-pay.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-correction-of-pay-view',
  templateUrl: './recording-correction-of-pay-view.component.html',
  styleUrls: ['./recording-correction-of-pay-view.component.scss'],
  providers: []
})

export class RecordingCorrectionOfPayViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingCorrectionOfPay: RecordingCorrectionOfPay;
  recordingCorrectionOfPayForm: FormGroup;

  private correctionTypesService: LookupService;

  
correctionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingCorrectionOfPayDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingCorrectionOfPayViewComponent>,
    public recordingCorrectionOfPayService: RecordingCorrectionOfPayService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionOfPay = this.selectedRecordingCorrectionOfPayDialog.data || this.selectedRecordingCorrectionOfPay;

    
	this.correctionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التصويب',
	});


    this.recordingCorrectionOfPayForm = this.formBuilder.group({
      
  correctionNumber : [this.selectedRecordingCorrectionOfPay.correctionNumber],
  employeeCode : [this.selectedRecordingCorrectionOfPay.employeeCode],
  correctionPeriodFrom : [this.selectedRecordingCorrectionOfPay.correctionPeriodFrom],
  correctionPeriodTo : [this.selectedRecordingCorrectionOfPay.correctionPeriodTo],
  supplementaryPay : [this.selectedRecordingCorrectionOfPay.supplementaryPay],
  extraValue : [this.selectedRecordingCorrectionOfPay.extraValue],
  allowances : [this.selectedRecordingCorrectionOfPay.allowances],
  cashAllowance : [this.selectedRecordingCorrectionOfPay.cashAllowance],
  carAllowance : [this.selectedRecordingCorrectionOfPay.carAllowance],
  retirementInstallments : [this.selectedRecordingCorrectionOfPay.retirementInstallments],
  totalDebt : [this.selectedRecordingCorrectionOfPay.totalDebt],
  sanctions : [this.selectedRecordingCorrectionOfPay.sanctions],
  governmentShare : [this.selectedRecordingCorrectionOfPay.governmentShare],
  correctionType : [this.selectedRecordingCorrectionOfPay.correctionType]
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
    return this.recordingCorrectionOfPayForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordingCorrectionOfPayForm.controls)) {
      this.recordingCorrectionOfPayForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
}

