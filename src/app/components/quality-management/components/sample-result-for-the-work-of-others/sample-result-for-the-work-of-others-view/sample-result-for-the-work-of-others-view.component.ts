
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SampleResultForTheWorkOfOthers } from 'app/shared/models/sample-result-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleResultForTheWorkOfOthersService } from '../shared/sample-result-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-result-for-the-work-of-others-view',
  templateUrl: './sample-result-for-the-work-of-others-view.component.html',
  styleUrls: ['./sample-result-for-the-work-of-others-view.component.scss'],
  providers: []
})

export class SampleResultForTheWorkOfOthersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleResultForTheWorkOfOthers: SampleResultForTheWorkOfOthers;
  sampleResultForTheWorkOfOthersForm: FormGroup;

  private laboratoriesService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;
private yesOrNoService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleResultForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleResultForTheWorkOfOthersViewComponent>,
    public sampleResultForTheWorkOfOthersService: SampleResultForTheWorkOfOthersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleResultForTheWorkOfOthers = this.selectedSampleResultForTheWorkOfOthersDialog.data || this.selectedSampleResultForTheWorkOfOthers;

    
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
      
  orderNumber : [this.selectedSampleResultForTheWorkOfOthers.orderNumber],
  sampleSpecificationCode : [this.selectedSampleResultForTheWorkOfOthers.sampleSpecificationCode],
  basicArticle : [this.selectedSampleResultForTheWorkOfOthers.basicArticle],
  subArticle : [this.selectedSampleResultForTheWorkOfOthers.subArticle],
  calledTesting : [this.selectedSampleResultForTheWorkOfOthers.calledTesting],
  serialSample : [this.selectedSampleResultForTheWorkOfOthers.serialSample],
  sampleTestDate : [this.selectedSampleResultForTheWorkOfOthers.sampleTestDate],
  laboratoryEngineer : [this.selectedSampleResultForTheWorkOfOthers.laboratoryEngineer],
  testStatementCode : [this.selectedSampleResultForTheWorkOfOthers.testStatementCode],
  statementTestName : [this.selectedSampleResultForTheWorkOfOthers.statementTestName],
  statementResult : [this.selectedSampleResultForTheWorkOfOthers.statementResult],
  age : [this.selectedSampleResultForTheWorkOfOthers.age],
  laboratory : [this.selectedSampleResultForTheWorkOfOthers.laboratory],
  measruingUnit : [this.selectedSampleResultForTheWorkOfOthers.measruingUnit],
  statementType : [this.selectedSampleResultForTheWorkOfOthers.statementType],
  sampleMatch : [this.selectedSampleResultForTheWorkOfOthers.sampleMatch]
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
    return this.sampleResultForTheWorkOfOthersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sampleResultForTheWorkOfOthersForm.controls)) {
      this.sampleResultForTheWorkOfOthersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
}

