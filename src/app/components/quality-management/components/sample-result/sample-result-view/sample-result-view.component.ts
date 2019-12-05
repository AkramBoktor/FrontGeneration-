
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SampleResult } from 'app/shared/models/sample-result';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleResultService } from '../shared/sample-result.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-result-view',
  templateUrl: './sample-result-view.component.html',
  styleUrls: ['./sample-result-view.component.scss'],
  providers: []
})

export class SampleResultViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleResult: SampleResult;
  sampleResultForm: FormGroup;

  private laboratoriesService: LookupService;
private yesOrNoService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleResultDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleResultViewComponent>,
    public sampleResultService: SampleResultService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleResult = this.selectedSampleResultDialog.data || this.selectedSampleResult;

    
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
      
  orderNumber : [this.selectedSampleResult.orderNumber],
  sampleSpecificationCode : [this.selectedSampleResult.sampleSpecificationCode],
  basicArticle : [this.selectedSampleResult.basicArticle],
  subArticle : [this.selectedSampleResult.subArticle],
  calledTesting : [this.selectedSampleResult.calledTesting],
  serialSample : [this.selectedSampleResult.serialSample],
  sampleTestDate : [this.selectedSampleResult.sampleTestDate],
  laboratoryEngineer : [this.selectedSampleResult.laboratoryEngineer],
  testStatementCode : [this.selectedSampleResult.testStatementCode],
  statementTestName : [this.selectedSampleResult.statementTestName],
  statementResult : [this.selectedSampleResult.statementResult],
  age : [this.selectedSampleResult.age],
  laboratory : [this.selectedSampleResult.laboratory],
  sampleMatch : [this.selectedSampleResult.sampleMatch],
  measruingUnit : [this.selectedSampleResult.measruingUnit],
  statementType : [this.selectedSampleResult.statementType]
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
    return this.sampleResultForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sampleResultForm.controls)) {
      this.sampleResultForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}

