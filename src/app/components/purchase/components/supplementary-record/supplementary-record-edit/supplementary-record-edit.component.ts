
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SupplementaryRecord } from 'app/shared/models/supplementary-record';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SupplementaryRecordService } from '../shared/supplementary-record.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-supplementary-record-edit',
  templateUrl: './supplementary-record-edit.component.html',
  styleUrls: ['./supplementary-record-edit.component.scss'],
  providers: []
})

export class SupplementaryRecordEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSupplementaryRecord: SupplementaryRecord;
  supplementaryRecordForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private classificationDegreesService: LookupService;
private offeringTypesService: LookupService;
private commissionerRequirementsService: LookupService;

  
classificationDegreeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
contributionsAfterNegotiationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('classificationDegree', { static: true }) ClassificationDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('contributionsAfterNegotiation', { static: true }) ContributionsAfterNegotiationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSupplementaryRecordDialog: any,
    @Optional() public dialogRef: MatDialogRef<SupplementaryRecordEditComponent>,
    public supplementaryRecordService: SupplementaryRecordService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupplementaryRecord = new SupplementaryRecord();
    this.selectedSupplementaryRecord = this.selectedSupplementaryRecordDialog.data || this.selectedSupplementaryRecord;

    
	this.classificationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التصنيف',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.contributionsAfterNegotiationSelectOptions = new MaterialSelectOptions({
	 data: this.commissionerRequirementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اشتراكات بعد المفاوضة',
	});


    this.supplementaryRecordForm = this.formBuilder.group({
      
  id : [this.selectedSupplementaryRecord.id],
  recordNumber : [this.selectedSupplementaryRecord.recordNumber, [ Validators.required ]],
  value : [this.selectedSupplementaryRecord.value, [ Validators.required ]],
  bouns : [this.selectedSupplementaryRecord.bouns, [ Validators.required ]],
  downPaymentRatio : [this.selectedSupplementaryRecord.downPaymentRatio, [ Validators.required ]],
  negotiationEndedBouns : [this.selectedSupplementaryRecord.negotiationEndedBouns, [ Validators.required ]],
  plenipotentiary : [this.selectedSupplementaryRecord.plenipotentiary, [ ]],
  durationExecution : [this.selectedSupplementaryRecord.durationExecution, [ ]],
  bonusProvided : [this.selectedSupplementaryRecord.bonusProvided, [ ]],
  tenderTotalValue : [this.selectedSupplementaryRecord.tenderTotalValue, [ ]],
  assayValue : [this.selectedSupplementaryRecord.assayValue, [ ]],
  advancePayment : [this.selectedSupplementaryRecord.advancePayment, [ ]],
  school : [this.selectedSupplementaryRecord.school, [ ]],
  companyName : [this.selectedSupplementaryRecord.companyName, [ ]],
  contractorCode : [this.selectedSupplementaryRecord.contractorCode, [ ]],
  tenderNumber : [this.selectedSupplementaryRecord.tenderNumber, [ Validators.required ]],
  bidNumber : [this.selectedSupplementaryRecord.bidNumber, [ Validators.required ]],
  reason : [this.selectedSupplementaryRecord.reason, [ Validators.required ]],
  classificationDegree : [this.selectedSupplementaryRecord.classificationDegree, [ Validators.required ]],
  offeringType : [this.selectedSupplementaryRecord.offeringType, [ Validators.required ]],
  contributionsAfterNegotiation : [this.selectedSupplementaryRecord.contributionsAfterNegotiation, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.supplementaryRecordService.update(this.supplementaryRecordForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.supplementaryRecordService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.supplementaryRecordForm.get(name);
  }

  initializeLookupServices() {
    this.classificationDegreesService = new LookupService('classificationdegrees', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.commissionerRequirementsService = new LookupService('commissionerrequirements', this.http);
  }
}
