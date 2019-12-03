
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SampleTestRequest } from 'app/shared/models/sample-test-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SampleTestRequestService } from '../shared/sample-test-request.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-test-request-edit',
  templateUrl: './sample-test-request-edit.component.html',
  styleUrls: ['./sample-test-request-edit.component.scss'],
  providers: []
})

export class SampleTestRequestEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleTestRequest: SampleTestRequest;
  sampleTestRequestForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('testRequestType', { static: true }) TestRequestTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sampleTestedType', { static: true }) SampleTestedTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('testdemand', { static: true }) TestdemandSelectComponent: MaterialSelectComponent;
	@ViewChild('sampleTested', { static: true }) SampleTestedSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringTypeCode', { static: true }) OfferingTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleTestRequestDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleTestRequestEditComponent>,
    public sampleTestRequestService: SampleTestRequestService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestRequest = new SampleTestRequest();
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
      
  id : [this.selectedSampleTestRequest.id],
  serialRequestTest : [this.selectedSampleTestRequest.serialRequestTest, [ Validators.required ]],
  supplier : [this.selectedSampleTestRequest.supplier, [ Validators.required ]],
  samplesNumber : [this.selectedSampleTestRequest.samplesNumber, [ Validators.required ]],
  educationalBuildingNumber : [this.selectedSampleTestRequest.educationalBuildingNumber, [ Validators.required ]],
  supplement : [this.selectedSampleTestRequest.supplement, [ Validators.required ]],
  bidNumber : [this.selectedSampleTestRequest.bidNumber, [ Validators.required ]],
  paidAmount : [this.selectedSampleTestRequest.paidAmount, [ ]],
  testRequestType : [this.selectedSampleTestRequest.testRequestType, [ Validators.required ]],
  sampleTestedType : [this.selectedSampleTestRequest.sampleTestedType, [ Validators.required ]],
  testdemand : [this.selectedSampleTestRequest.testdemand, [ Validators.required ]],
  sampleTested : [this.selectedSampleTestRequest.sampleTested, [ Validators.required ]],
  offeringTypeCode : [this.selectedSampleTestRequest.offeringTypeCode, [ Validators.required ]],
  laboratoryCode : [this.selectedSampleTestRequest.laboratoryCode, [ Validators.required ]],
  branchCode : [this.selectedSampleTestRequest.branchCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sampleTestRequestService.update(this.sampleTestRequestForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sampleTestRequestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sampleTestRequestForm.get(name);
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
