
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SampleTestRequest } from 'app/shared/models/sample-test-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestRequestService } from '../shared/sample-test-request.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-request-view',
  templateUrl: './sample-test-request-view.component.html',
  styleUrls: ['./sample-test-request-view.component.scss'],
  providers: []
})

export class SampleTestRequestViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleTestRequest: SampleTestRequest;
  sampleTestRequestForm: FormGroup;

  private testRequestTypesService: LookupService;
private sampleTestedTypesService: LookupService;
private testdemandsService: LookupService;
private sampleTestedsService: LookupService;
private offeringTypesService: LookupService;
private laboratoriesService: LookupService;
private branchCodesService: LookupService;

  
testRequestTypeSelectOptions: MaterialSelectOptions;
sampleTestedTypeSelectOptions: MaterialSelectOptions;
testdemandSelectOptions: MaterialSelectOptions;
sampleTestedSelectOptions: MaterialSelectOptions;
offeringTypeCodeSelectOptions: MaterialSelectOptions;
laboratoryCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleTestRequestDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleTestRequestViewComponent>,
    public sampleTestRequestService: SampleTestRequestService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestRequest = this.selectedSampleTestRequestDialog.data || this.selectedSampleTestRequest;

    
	this.testRequestTypeSelectOptions = new MaterialSelectOptions({
	 data: this.testRequestTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع طلب الاختبار',
	});

	this.sampleTestedTypeSelectOptions = new MaterialSelectOptions({
	 data: this.sampleTestedTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العينة المختبره',
	});

	this.testdemandSelectOptions = new MaterialSelectOptions({
	 data: this.testdemandsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طالب الاختبار',
	});

	this.sampleTestedSelectOptions = new MaterialSelectOptions({
	 data: this.sampleTestedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العينة المختبرة',
	});

	this.offeringTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطرح',
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


    this.sampleTestRequestForm = this.formBuilder.group({
      
  serialRequestTest : [this.selectedSampleTestRequest.serialRequestTest],
  supplier : [this.selectedSampleTestRequest.supplier],
  samplesNumber : [this.selectedSampleTestRequest.samplesNumber],
  educationalBuildingNumber : [this.selectedSampleTestRequest.educationalBuildingNumber],
  supplement : [this.selectedSampleTestRequest.supplement],
  bidNumber : [this.selectedSampleTestRequest.bidNumber],
  paidAmount : [this.selectedSampleTestRequest.paidAmount],
  testRequestType : [this.selectedSampleTestRequest.testRequestType],
  sampleTestedType : [this.selectedSampleTestRequest.sampleTestedType],
  testdemand : [this.selectedSampleTestRequest.testdemand],
  sampleTested : [this.selectedSampleTestRequest.sampleTested],
  offeringTypeCode : [this.selectedSampleTestRequest.offeringTypeCode],
  laboratoryCode : [this.selectedSampleTestRequest.laboratoryCode],
  branchCode : [this.selectedSampleTestRequest.branchCode]
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
    return this.sampleTestRequestForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sampleTestRequestForm.controls)) {
      this.sampleTestRequestForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.testRequestTypesService = new LookupService('testrequesttypes', this.http);
this.sampleTestedTypesService = new LookupService('sampletestedtypes', this.http);
this.testdemandsService = new LookupService('testdemands', this.http);
this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.laboratoriesService = new LookupService('laboratories', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

