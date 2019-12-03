
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SampleResultForTheWorkOfOthers } from 'app/shared/models/sample-result-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SampleResultForTheWorkOfOthersService } from '../shared/sample-result-for-the-work-of-others.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-result-for-the-work-of-others-edit',
  templateUrl: './sample-result-for-the-work-of-others-edit.component.html',
  styleUrls: ['./sample-result-for-the-work-of-others-edit.component.scss'],
  providers: []
})

export class SampleResultForTheWorkOfOthersEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleResultForTheWorkOfOthers: SampleResultForTheWorkOfOthers;
  sampleResultForTheWorkOfOthersForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleResultForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleResultForTheWorkOfOthersEditComponent>,
    public sampleResultForTheWorkOfOthersService: SampleResultForTheWorkOfOthersService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleResultForTheWorkOfOthers = new SampleResultForTheWorkOfOthers();
    this.selectedSampleResultForTheWorkOfOthers = this.selectedSampleResultForTheWorkOfOthersDialog.data || this.selectedSampleResultForTheWorkOfOthers;

    
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


    this.sampleResultForTheWorkOfOthersForm = this.formBuilder.group({
      
  id : [this.selectedSampleResultForTheWorkOfOthers.id],
  laboratoryEngineer : [this.selectedSampleResultForTheWorkOfOthers.laboratoryEngineer, [ Validators.required ]],
  testStatementCode : [this.selectedSampleResultForTheWorkOfOthers.testStatementCode, [ Validators.required ]],
  statementTestName : [this.selectedSampleResultForTheWorkOfOthers.statementTestName, [ Validators.required ]],
  statementResult : [this.selectedSampleResultForTheWorkOfOthers.statementResult, [ Validators.required ]],
  age : [this.selectedSampleResultForTheWorkOfOthers.age, [ ]],
  sampleTestDate : [this.selectedSampleResultForTheWorkOfOthers.sampleTestDate, [ ]],
  calledTesting : [this.selectedSampleResultForTheWorkOfOthers.calledTesting, [ Validators.required ]],
  serialSample : [this.selectedSampleResultForTheWorkOfOthers.serialSample, [ Validators.required ]],
  orderNumber : [this.selectedSampleResultForTheWorkOfOthers.orderNumber, [ Validators.required ]],
  sampleSpecificationCode : [this.selectedSampleResultForTheWorkOfOthers.sampleSpecificationCode, [ Validators.required ]],
  basicArticle : [this.selectedSampleResultForTheWorkOfOthers.basicArticle, [ Validators.required ]],
  subArticle : [this.selectedSampleResultForTheWorkOfOthers.subArticle, [ Validators.required ]],
  laboratory : [this.selectedSampleResultForTheWorkOfOthers.laboratory, [ Validators.required ]],
  sampleMatch : [this.selectedSampleResultForTheWorkOfOthers.sampleMatch, [ Validators.required ]],
  measruingUnit : [this.selectedSampleResultForTheWorkOfOthers.measruingUnit, [ Validators.required ]],
  statementType : [this.selectedSampleResultForTheWorkOfOthers.statementType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sampleResultForTheWorkOfOthersService.update(this.sampleResultForTheWorkOfOthersForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sampleResultForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sampleResultForTheWorkOfOthersForm.get(name);
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}
