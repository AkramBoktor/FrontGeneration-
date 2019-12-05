
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SampleTestRequestForTheWorkOfOthers } from 'app/shared/models/sample-test-request-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleTestRequestForTheWorkOfOthersService } from '../shared/sample-test-request-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-test-request-for-the-work-of-others-new',
  templateUrl: './sample-test-request-for-the-work-of-others-new.component.html',
  styleUrls: ['./sample-test-request-for-the-work-of-others-new.component.scss'],
  providers: [
    ]
})

export class SampleTestRequestForTheWorkOfOthersNewComponent extends AppBaseComponent implements OnInit {
  sampleTestRequestForTheWorkOfOthersForm: FormGroup;
  @Input() selectedSampleTestRequestForTheWorkOfOthers: SampleTestRequestForTheWorkOfOthers;
  errorMessages: FormControlError[] = [
        
  ];

  private sampleTestedsService: LookupService;
private laboratoriesService: LookupService;
private branchCodesService: LookupService;
private receiptsorChecksService: LookupService;

  
sampleTestedSelectOptions: MaterialSelectOptions;
laboratoryCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
typeOfReceiptOrCheckSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sampleTested', { static: true }) SampleTestedSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfReceiptOrCheck', { static: true }) TypeOfReceiptOrCheckSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SampleTestRequestForTheWorkOfOthersNewComponent>,
    public sampleTestRequestForTheWorkOfOthersService: SampleTestRequestForTheWorkOfOthersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestRequestForTheWorkOfOthers = new SampleTestRequestForTheWorkOfOthers();

    
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
     
  id : [0],
  serialRequestTest : [this.selectedSampleTestRequestForTheWorkOfOthers.serialRequestTest, [ Validators.required ]],
  contractorCode : [this.selectedSampleTestRequestForTheWorkOfOthers.contractorCode, [ Validators.required ]],
  samplesNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.samplesNumber, [ Validators.required ]],
  educationalBuildingNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.educationalBuildingNumber, [ Validators.required ]],
  supplement : [this.selectedSampleTestRequestForTheWorkOfOthers.supplement, [ Validators.required ]],
  paidAmount : [this.selectedSampleTestRequestForTheWorkOfOthers.paidAmount, [ ]],
  receiptOrCheckNumber : [this.selectedSampleTestRequestForTheWorkOfOthers.receiptOrCheckNumber, [ Validators.required ]],
  dateOfReceiptOrCheck : [this.selectedSampleTestRequestForTheWorkOfOthers.dateOfReceiptOrCheck, [ Validators.required ]],
  projectCode : [this.selectedSampleTestRequestForTheWorkOfOthers.projectCode, [ Validators.required ]],
  sampleTested : [this.selectedSampleTestRequestForTheWorkOfOthers.sampleTested, [ Validators.required ]],
  laboratoryCode : [this.selectedSampleTestRequestForTheWorkOfOthers.laboratoryCode, [ Validators.required ]],
  branchCode : [this.selectedSampleTestRequestForTheWorkOfOthers.branchCode, [ Validators.required ]],
  typeOfReceiptOrCheck : [this.selectedSampleTestRequestForTheWorkOfOthers.typeOfReceiptOrCheck, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sampleTestRequestForTheWorkOfOthersService.create(this.sampleTestRequestForTheWorkOfOthersForm.value)
        .pipe(switchMap(x => {
			return this.sampleTestRequestForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sampleTestRequestForTheWorkOfOthersForm.get(name);
    }

  initializeLookupServices() {
    this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.laboratoriesService = new LookupService('laboratories', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.receiptsorChecksService = new LookupService('receiptsorchecks', this.http);
  }
 }
