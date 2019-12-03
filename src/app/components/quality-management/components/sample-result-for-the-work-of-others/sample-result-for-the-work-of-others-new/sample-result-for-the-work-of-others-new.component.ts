
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SampleResultForTheWorkOfOthers } from 'app/shared/models/sample-result-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleResultForTheWorkOfOthersService } from '../shared/sample-result-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-result-for-the-work-of-others-new',
  templateUrl: './sample-result-for-the-work-of-others-new.component.html',
  styleUrls: ['./sample-result-for-the-work-of-others-new.component.scss'],
  providers: [
    ]
})

export class SampleResultForTheWorkOfOthersNewComponent extends AppBaseComponent implements OnInit {
  sampleResultForTheWorkOfOthersForm: FormGroup;
  @Input() selectedSampleResultForTheWorkOfOthers: SampleResultForTheWorkOfOthers;
  errorMessages: FormControlError[] = [
        
  ];

  private laboratoriesService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;
private yesOrNoService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratory', { static: true }) LaboratorySelectComponent: MaterialSelectComponent;
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sampleMatch', { static: true }) SampleMatchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SampleResultForTheWorkOfOthersNewComponent>,
    public sampleResultForTheWorkOfOthersService: SampleResultForTheWorkOfOthersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleResultForTheWorkOfOthers = new SampleResultForTheWorkOfOthers();

    
	this.laboratorySelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعمل',
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

	this.sampleMatchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مطابقة العينة',
	});


    this.sampleResultForTheWorkOfOthersForm = this.formBuilder.group({
     
  id : [0],
  orderNumber : [this.selectedSampleResultForTheWorkOfOthers.orderNumber, [ Validators.required ]],
  sampleSpecificationCode : [this.selectedSampleResultForTheWorkOfOthers.sampleSpecificationCode, [ Validators.required ]],
  basicArticle : [this.selectedSampleResultForTheWorkOfOthers.basicArticle, [ Validators.required ]],
  subArticle : [this.selectedSampleResultForTheWorkOfOthers.subArticle, [ Validators.required ]],
  calledTesting : [this.selectedSampleResultForTheWorkOfOthers.calledTesting, [ Validators.required ]],
  serialSample : [this.selectedSampleResultForTheWorkOfOthers.serialSample, [ Validators.required ]],
  sampleTestDate : [this.selectedSampleResultForTheWorkOfOthers.sampleTestDate, [ ]],
  laboratoryEngineer : [this.selectedSampleResultForTheWorkOfOthers.laboratoryEngineer, [ Validators.required ]],
  testStatementCode : [this.selectedSampleResultForTheWorkOfOthers.testStatementCode, [ Validators.required ]],
  statementTestName : [this.selectedSampleResultForTheWorkOfOthers.statementTestName, [ Validators.required ]],
  statementResult : [this.selectedSampleResultForTheWorkOfOthers.statementResult, [ Validators.required ]],
  age : [this.selectedSampleResultForTheWorkOfOthers.age, [ ]],
  laboratory : [this.selectedSampleResultForTheWorkOfOthers.laboratory, [ Validators.required ]],
  measruingUnit : [this.selectedSampleResultForTheWorkOfOthers.measruingUnit, [ Validators.required ]],
  statementType : [this.selectedSampleResultForTheWorkOfOthers.statementType, [ Validators.required ]],
  sampleMatch : [this.selectedSampleResultForTheWorkOfOthers.sampleMatch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sampleResultForTheWorkOfOthersService.create(this.sampleResultForTheWorkOfOthersForm.value)
        .pipe(switchMap(x => {
			return this.sampleResultForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sampleResultForTheWorkOfOthersForm.get(name);
    }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
 }
