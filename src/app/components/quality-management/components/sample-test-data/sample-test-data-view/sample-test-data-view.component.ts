
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SampleTestData } from 'app/shared/models/sample-test-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestDataService } from '../shared/sample-test-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-data-view',
  templateUrl: './sample-test-data-view.component.html',
  styleUrls: ['./sample-test-data-view.component.scss'],
  providers: []
})

export class SampleTestDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleTestData: SampleTestData;
  sampleTestDataForm: FormGroup;

  private measurementUnitsService: LookupService;

  
measruingUnitSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleTestDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleTestDataViewComponent>,
    public sampleTestDataService: SampleTestDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestData = this.selectedSampleTestDataDialog.data || this.selectedSampleTestData;

    
	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});


    this.sampleTestDataForm = this.formBuilder.group({
      
  basicMaterialCode : [this.selectedSampleTestData.basicMaterialCode],
  subMaterialCode : [this.selectedSampleTestData.subMaterialCode],
  testCode : [this.selectedSampleTestData.testCode],
  statementTestingName : [this.selectedSampleTestData.statementTestingName],
  statementValueNoMoreThan : [this.selectedSampleTestData.statementValueNoMoreThan],
  statementValueNotLessThan : [this.selectedSampleTestData.statementValueNotLessThan],
  measruingUnit : [this.selectedSampleTestData.measruingUnit]
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
    return this.sampleTestDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sampleTestDataForm.controls)) {
      this.sampleTestDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

