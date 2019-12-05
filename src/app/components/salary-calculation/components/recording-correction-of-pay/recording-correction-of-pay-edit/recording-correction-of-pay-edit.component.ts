
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordingCorrectionOfPay } from 'app/shared/models/recording-correction-of-pay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordingCorrectionOfPayService } from '../shared/recording-correction-of-pay.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-correction-of-pay-edit',
  templateUrl: './recording-correction-of-pay-edit.component.html',
  styleUrls: ['./recording-correction-of-pay-edit.component.scss'],
  providers: []
})

export class RecordingCorrectionOfPayEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingCorrectionOfPay: RecordingCorrectionOfPay;
  recordingCorrectionOfPayForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private correctionTypesService: LookupService;

  
correctionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionType', { static: true }) CorrectionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingCorrectionOfPayDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingCorrectionOfPayEditComponent>,
    public recordingCorrectionOfPayService: RecordingCorrectionOfPayService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionOfPay = new RecordingCorrectionOfPay();
    this.selectedRecordingCorrectionOfPay = this.selectedRecordingCorrectionOfPayDialog.data || this.selectedRecordingCorrectionOfPay;

    
	this.correctionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التصويب',
	});


    this.recordingCorrectionOfPayForm = this.formBuilder.group({
      
  id : [this.selectedRecordingCorrectionOfPay.id],
  correctionNumber : [this.selectedRecordingCorrectionOfPay.correctionNumber, [ Validators.required ]],
  employeeCode : [this.selectedRecordingCorrectionOfPay.employeeCode, [ Validators.required ]],
  correctionPeriodFrom : [this.selectedRecordingCorrectionOfPay.correctionPeriodFrom, [ Validators.required ]],
  correctionPeriodTo : [this.selectedRecordingCorrectionOfPay.correctionPeriodTo, [ Validators.required ]],
  supplementaryPay : [this.selectedRecordingCorrectionOfPay.supplementaryPay, [ Validators.required ]],
  extraValue : [this.selectedRecordingCorrectionOfPay.extraValue, [ Validators.required ]],
  allowances : [this.selectedRecordingCorrectionOfPay.allowances, [ Validators.required ]],
  cashAllowance : [this.selectedRecordingCorrectionOfPay.cashAllowance, [ Validators.required ]],
  carAllowance : [this.selectedRecordingCorrectionOfPay.carAllowance, [ Validators.required ]],
  retirementInstallments : [this.selectedRecordingCorrectionOfPay.retirementInstallments, [ Validators.required ]],
  totalDebt : [this.selectedRecordingCorrectionOfPay.totalDebt, [ Validators.required ]],
  sanctions : [this.selectedRecordingCorrectionOfPay.sanctions, [ Validators.required ]],
  governmentShare : [this.selectedRecordingCorrectionOfPay.governmentShare, [ Validators.required ]],
  correctionType : [this.selectedRecordingCorrectionOfPay.correctionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordingCorrectionOfPayService.update(this.recordingCorrectionOfPayForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordingCorrectionOfPayService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordingCorrectionOfPayForm.get(name);
  }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
}
