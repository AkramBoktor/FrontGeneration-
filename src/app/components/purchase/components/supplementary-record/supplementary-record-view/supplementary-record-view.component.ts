
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SupplementaryRecord } from 'app/shared/models/supplementary-record';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SupplementaryRecordService } from '../shared/supplementary-record.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-supplementary-record-view',
  templateUrl: './supplementary-record-view.component.html',
  styleUrls: ['./supplementary-record-view.component.scss'],
  providers: []
})

export class SupplementaryRecordViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSupplementaryRecord: SupplementaryRecord;
  supplementaryRecordForm: FormGroup;

  private offeringTypesService: LookupService;
private classificationDegreesService: LookupService;
private commissionerRequirementsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
classificationDegreeSelectOptions: MaterialSelectOptions;
contributionsAfterNegotiationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSupplementaryRecordDialog: any,
    @Optional() public dialogRef: MatDialogRef<SupplementaryRecordViewComponent>,
    public supplementaryRecordService: SupplementaryRecordService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupplementaryRecord = this.selectedSupplementaryRecordDialog.data || this.selectedSupplementaryRecord;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.classificationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التصنيف',
	});

	this.contributionsAfterNegotiationSelectOptions = new MaterialSelectOptions({
	 data: this.commissionerRequirementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اشتراكات بعد المفاوضة',
	});


    this.supplementaryRecordForm = this.formBuilder.group({
      
  recordNumber : [this.selectedSupplementaryRecord.recordNumber],
  bidNumber : [this.selectedSupplementaryRecord.bidNumber],
  tenderNumber : [this.selectedSupplementaryRecord.tenderNumber],
  contractorCode : [this.selectedSupplementaryRecord.contractorCode],
  companyName : [this.selectedSupplementaryRecord.companyName],
  school : [this.selectedSupplementaryRecord.school],
  advancePayment : [this.selectedSupplementaryRecord.advancePayment],
  assayValue : [this.selectedSupplementaryRecord.assayValue],
  tenderTotalValue : [this.selectedSupplementaryRecord.tenderTotalValue],
  bonusProvided : [this.selectedSupplementaryRecord.bonusProvided],
  durationExecution : [this.selectedSupplementaryRecord.durationExecution],
  plenipotentiary : [this.selectedSupplementaryRecord.plenipotentiary],
  negotiationEndedBouns : [this.selectedSupplementaryRecord.negotiationEndedBouns],
  downPaymentRatio : [this.selectedSupplementaryRecord.downPaymentRatio],
  bouns : [this.selectedSupplementaryRecord.bouns],
  value : [this.selectedSupplementaryRecord.value],
  reason : [this.selectedSupplementaryRecord.reason],
  offeringType : [this.selectedSupplementaryRecord.offeringType],
  classificationDegree : [this.selectedSupplementaryRecord.classificationDegree],
  contributionsAfterNegotiation : [this.selectedSupplementaryRecord.contributionsAfterNegotiation]
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
    return this.supplementaryRecordForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.supplementaryRecordForm.controls)) {
      this.supplementaryRecordForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.classificationDegreesService = new LookupService('classificationdegrees', this.http);
this.commissionerRequirementsService = new LookupService('commissionerrequirements', this.http);
  }
}

