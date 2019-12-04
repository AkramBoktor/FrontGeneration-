
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SampleTestRequestForTheWorkOfOthers } from 'app/shared/models/sample-test-request-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestRequestForTheWorkOfOthersService } from '../shared/sample-test-request-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-request-for-the-work-of-others-view',
  templateUrl: './sample-test-request-for-the-work-of-others-view.component.html',
  styleUrls: ['./sample-test-request-for-the-work-of-others-view.component.scss'],
  providers: []
})

export class SampleTestRequestForTheWorkOfOthersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleTestRequestForTheWorkOfOthers: SampleTestRequestForTheWorkOfOthers;
  sampleTestRequestForTheWorkOfOthersForm: FormGroup;

  private sampleTestedsService: LookupService;
private laboratoriesService: LookupService;
private branchCodesService: LookupService;
private receiptsorChecksService: LookupService;

  
sampleTestedSelectOptions: MaterialSelectOptions;
laboratoryCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
typeOfReceiptOrCheckSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleTestRequestForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleTestRequestForTheWorkOfOthersViewComponent>,
    public sampleTestRequestForTheWorkOfOthersService: SampleTestRequestForTheWorkOfOthersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestRequestForTheWorkOfOthers = this.selectedSampleTestRequestForTheWorkOfOthersDialog.data || this.selectedSampleTestRequestForTheWorkOfOthers;

    
	this.sampleTestedSelectOptions = new MaterialSelectOptions({
	 data: this.sampleTestedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العينة المختبرة',
	});

	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.typeOfReceiptOrCheckSelectOptions = new MaterialSelectOptions({
	 data: this.receiptsorChecksService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الايصال او الشيك',
	});


    this.sampleTestRequestForTheWorkOfOthersForm = this.formBuilder.group({
      
  serialRequestTest : [this.selectedSampleTestRequestForTheWorkOfOthers.serialRequestTest],
  contractorCode : [this.selectedSampleTestRequestForTheWorkOfOthers.contractorCode],
  samplesNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.samplesNumber],
  educationalBuildingNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.educationalBuildingNumber],
  supplement : [this.selectedSampleTestRequestForTheWorkOfOthers.supplement],
  paidAmount : [this.selectedSampleTestRequestForTheWorkOfOthers.paidAmount],
  receiptOrCheckNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.receiptOrCheckNumber],
  dateOfReceiptOrCheck : [this.selectedSampleTestRequestForTheWorkOfOthers.dateOfReceiptOrCheck],
  projectCode : [this.selectedSampleTestRequestForTheWorkOfOthers.projectCode],
  sampleTested : [this.selectedSampleTestRequestForTheWorkOfOthers.sampleTested],
  laboratoryCode : [this.selectedSampleTestRequestForTheWorkOfOthers.laboratoryCode],
  branchCode : [this.selectedSampleTestRequestForTheWorkOfOthers.branchCode],
  typeOfReceiptOrCheck : [this.selectedSampleTestRequestForTheWorkOfOthers.typeOfReceiptOrCheck]
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
    return this.sampleTestRequestForTheWorkOfOthersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sampleTestRequestForTheWorkOfOthersForm.controls)) {
      this.sampleTestRequestForTheWorkOfOthersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.laboratoriesService = new LookupService('laboratories', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.receiptsorChecksService = new LookupService('receiptsorchecks', this.http);
  }
}

