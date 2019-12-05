
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SampleResult } from 'app/shared/models/sample-result';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleResultService } from '../shared/sample-result.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-result-new',
  templateUrl: './sample-result-new.component.html',
  styleUrls: ['./sample-result-new.component.scss'],
  providers: [
    ]
})

export class SampleResultNewComponent extends AppBaseComponent implements OnInit {
  sampleResultForm: FormGroup;
  @Input() selectedSampleResult: SampleResult;
  errorMessages: FormControlError[] = [
        
  ];

  private laboratoriesService: LookupService;
private yesOrNoService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratory', { static: true }) LaboratorySelectComponent: MaterialSelectComponent;
	@ViewChild('sampleMatch', { static: true }) SampleMatchSelectComponent: MaterialSelectComponent;
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SampleResultNewComponent>,
    public sampleResultService: SampleResultService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleResult = new SampleResult();

    
	this.laboratorySelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعمل',
	});

	this.sampleMatchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مطابقة العينة',
	});

	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});

	this.statementTypeSelectOptions = new MaterialSelectOptions({
	 data: this.statementTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البيان',
	});


    this.sampleResultForm = this.formBuilder.group({
     
  id : [0],
  orderNumber : [this.selectedSampleResult.orderNumber, [ Validators.required ]],
  sampleSpecificationCode : [this.selectedSampleResult.sampleSpecificationCode, [ Validators.required ]],
  basicArticle : [this.selectedSampleResult.basicArticle, [ Validators.required ]],
  subArticle : [this.selectedSampleResult.subArticle, [ Validators.required ]],
  calledTesting : [this.selectedSampleResult.calledTesting, [ Validators.required ]],
  serialSample : [this.selectedSampleResult.serialSample, [ Validators.required ]],
  sampleTestDate : [this.selectedSampleResult.sampleTestDate, [ Validators.required ]],
  laboratoryEngineer : [this.selectedSampleResult.laboratoryEngineer, [ Validators.required ]],
  testStatementCode : [this.selectedSampleResult.testStatementCode, [ Validators.required ]],
  statementTestName : [this.selectedSampleResult.statementTestName, [ Validators.required ]],
  statementResult : [this.selectedSampleResult.statementResult, [ Validators.required ]],
  age : [this.selectedSampleResult.age, [ ]],
  laboratory : [this.selectedSampleResult.laboratory, [ Validators.required ]],
  sampleMatch : [this.selectedSampleResult.sampleMatch, [ Validators.required ]],
  measruingUnit : [this.selectedSampleResult.measruingUnit, [ Validators.required ]],
  statementType : [this.selectedSampleResult.statementType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sampleResultService.create(this.sampleResultForm.value)
        .pipe(switchMap(x => {
			return this.sampleResultService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sampleResultForm.get(name);
    }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
 }
