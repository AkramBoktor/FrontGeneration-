
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataLimitsAcceptAndRejectForSample } from 'app/shared/models/data-limits-accept-and-reject-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataLimitsAcceptAndRejectForSampleService } from '../shared/data-limits-accept-and-reject-for-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-limits-accept-and-reject-for-sample-new',
  templateUrl: './data-limits-accept-and-reject-for-sample-new.component.html',
  styleUrls: ['./data-limits-accept-and-reject-for-sample-new.component.scss'],
  providers: [
    ]
})

export class DataLimitsAcceptAndRejectForSampleNewComponent extends AppBaseComponent implements OnInit {
  dataLimitsAcceptAndRejectForSampleForm: FormGroup;
  @Input() selectedDataLimitsAcceptAndRejectForSample: DataLimitsAcceptAndRejectForSample;
  errorMessages: FormControlError[] = [
        
  ];

  private measurementUnitsService: LookupService;
private statementTypesService: LookupService;

  
measruingUnitStatementSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('measruingUnitStatement', { static: true }) MeasruingUnitStatementSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataLimitsAcceptAndRejectForSampleNewComponent>,
    public dataLimitsAcceptAndRejectForSampleService: DataLimitsAcceptAndRejectForSampleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataLimitsAcceptAndRejectForSample = new DataLimitsAcceptAndRejectForSample();

    
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
     
  id : [0],
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
    this.dataLimitsAcceptAndRejectForSampleService.create(this.dataLimitsAcceptAndRejectForSampleForm.value)
        .pipe(switchMap(x => {
			return this.dataLimitsAcceptAndRejectForSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataLimitsAcceptAndRejectForSampleForm.get(name);
    }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
  }
 }
