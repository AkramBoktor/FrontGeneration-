
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordingCorrectionOfPay } from 'app/shared/models/recording-correction-of-pay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingCorrectionOfPayService } from '../shared/recording-correction-of-pay.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-correction-of-pay-new',
  templateUrl: './recording-correction-of-pay-new.component.html',
  styleUrls: ['./recording-correction-of-pay-new.component.scss'],
  providers: [
    ]
})

export class RecordingCorrectionOfPayNewComponent extends AppBaseComponent implements OnInit {
  recordingCorrectionOfPayForm: FormGroup;
  @Input() selectedRecordingCorrectionOfPay: RecordingCorrectionOfPay;
  errorMessages: FormControlError[] = [
        
  ];

  private correctionTypesService: LookupService;

  
correctionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionType', { static: true }) CorrectionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordingCorrectionOfPayNewComponent>,
    public recordingCorrectionOfPayService: RecordingCorrectionOfPayService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionOfPay = new RecordingCorrectionOfPay();

    
	this.correctionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التصويب',
	});


    this.recordingCorrectionOfPayForm = this.formBuilder.group({
     
  id : [0],
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
    this.recordingCorrectionOfPayService.create(this.recordingCorrectionOfPayForm.value)
        .pipe(switchMap(x => {
			return this.recordingCorrectionOfPayService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordingCorrectionOfPayForm.get(name);
    }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
 }
