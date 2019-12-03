
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataLimitsAcceptAndRejectForSample } from 'app/shared/models/data-limits-accept-and-reject-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataLimitsAcceptAndRejectForSampleService } from '../shared/data-limits-accept-and-reject-for-sample.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-limits-accept-and-reject-for-sample-edit',
  templateUrl: './data-limits-accept-and-reject-for-sample-edit.component.html',
  styleUrls: ['./data-limits-accept-and-reject-for-sample-edit.component.scss'],
  providers: []
})

export class DataLimitsAcceptAndRejectForSampleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataLimitsAcceptAndRejectForSample: DataLimitsAcceptAndRejectForSample;
  dataLimitsAcceptAndRejectForSampleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private measurementUnitsService: LookupService;
private statementTypesService: LookupService;

  
measruingUnitStatementSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('measruingUnitStatement', { static: true }) MeasruingUnitStatementSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataLimitsAcceptAndRejectForSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataLimitsAcceptAndRejectForSampleEditComponent>,
    public dataLimitsAcceptAndRejectForSampleService: DataLimitsAcceptAndRejectForSampleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataLimitsAcceptAndRejectForSample = new DataLimitsAcceptAndRejectForSample();
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
      
  id : [this.selectedDataLimitsAcceptAndRejectForSample.id],
  basicMaterialCode : [this.selectedDataLimitsAcceptAndRejectForSample.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedDataLimitsAcceptAndRejectForSample.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedDataLimitsAcceptAndRejectForSample.testCode, [ Validators.required ]],
  testStatementName : [this.selectedDataLimitsAcceptAndRejectForSample.testStatementName, [ ]],
  noMoreThanStatementvalue : [this.selectedDataLimitsAcceptAndRejectForSample.noMoreThanStatementvalue, [ Validators.required ]],
  notLessThanStatementValue : [this.selectedDataLimitsAcceptAndRejectForSample.notLessThanStatementValue, [ Validators.required ]],
  measruingUnitStatement : [this.selectedDataLimitsAcceptAndRejectForSample.measruingUnitStatement, [ Validators.required ]],
  statementType : [this.selectedDataLimitsAcceptAndRejectForSample.statementType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataLimitsAcceptAndRejectForSampleService.update(this.dataLimitsAcceptAndRejectForSampleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataLimitsAcceptAndRejectForSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataLimitsAcceptAndRejectForSampleForm.get(name);
  }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
}
