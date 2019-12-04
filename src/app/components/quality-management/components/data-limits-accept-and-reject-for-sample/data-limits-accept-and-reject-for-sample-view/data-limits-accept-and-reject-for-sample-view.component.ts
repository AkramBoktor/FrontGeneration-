
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataLimitsAcceptAndRejectForSample } from 'app/shared/models/data-limits-accept-and-reject-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataLimitsAcceptAndRejectForSampleService } from '../shared/data-limits-accept-and-reject-for-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-limits-accept-and-reject-for-sample-view',
  templateUrl: './data-limits-accept-and-reject-for-sample-view.component.html',
  styleUrls: ['./data-limits-accept-and-reject-for-sample-view.component.scss'],
  providers: []
})

export class DataLimitsAcceptAndRejectForSampleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataLimitsAcceptAndRejectForSample: DataLimitsAcceptAndRejectForSample;
  dataLimitsAcceptAndRejectForSampleForm: FormGroup;

  private measurementUnitsService: LookupService;
private statementTypesService: LookupService;

  
measruingUnitStatementSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataLimitsAcceptAndRejectForSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataLimitsAcceptAndRejectForSampleViewComponent>,
    public dataLimitsAcceptAndRejectForSampleService: DataLimitsAcceptAndRejectForSampleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataLimitsAcceptAndRejectForSample = this.selectedDataLimitsAcceptAndRejectForSampleDialog.data || this.selectedDataLimitsAcceptAndRejectForSample;

    
	this.measruingUnitStatementSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});

	this.statementTypeSelectOptions = new MaterialSelectOptions({
	 data: this.statementTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البيان',
	});


    this.dataLimitsAcceptAndRejectForSampleForm = this.formBuilder.group({
      
  basicMaterialCode : [this.selectedDataLimitsAcceptAndRejectForSample.basicMaterialCode],
  subMaterialCode : [this.selectedDataLimitsAcceptAndRejectForSample.subMaterialCode],
  testCode : [this.selectedDataLimitsAcceptAndRejectForSample.testCode],
  testStatementName : [this.selectedDataLimitsAcceptAndRejectForSample.testStatementName],
  noMoreThanStatementvalue : [this.selectedDataLimitsAcceptAndRejectForSample.noMoreThanStatementvalue],
  notLessThanStatementValue : [this.selectedDataLimitsAcceptAndRejectForSample.notLessThanStatementValue],
  measruingUnitStatement : [this.selectedDataLimitsAcceptAndRejectForSample.measruingUnitStatement],
  statementType : [this.selectedDataLimitsAcceptAndRejectForSample.statementType]
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
    return this.dataLimitsAcceptAndRejectForSampleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataLimitsAcceptAndRejectForSampleForm.controls)) {
      this.dataLimitsAcceptAndRejectForSampleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}

