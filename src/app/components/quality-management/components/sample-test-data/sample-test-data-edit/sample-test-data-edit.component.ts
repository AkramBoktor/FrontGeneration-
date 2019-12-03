
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SampleTestData } from 'app/shared/models/sample-test-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SampleTestDataService } from '../shared/sample-test-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-test-data-edit',
  templateUrl: './sample-test-data-edit.component.html',
  styleUrls: ['./sample-test-data-edit.component.scss'],
  providers: []
})

export class SampleTestDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSampleTestData: SampleTestData;
  sampleTestDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private measurementUnitsService: LookupService;

  
measruingUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSampleTestDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SampleTestDataEditComponent>,
    public sampleTestDataService: SampleTestDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestData = new SampleTestData();
    this.selectedSampleTestData = this.selectedSampleTestDataDialog.data || this.selectedSampleTestData;

    
	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});


    this.sampleTestDataForm = this.formBuilder.group({
      
  id : [this.selectedSampleTestData.id],
  basicMaterialCode : [this.selectedSampleTestData.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedSampleTestData.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedSampleTestData.testCode, [ Validators.required ]],
  statementTestingName : [this.selectedSampleTestData.statementTestingName, [ ]],
  statementValueNoMoreThan : [this.selectedSampleTestData.statementValueNoMoreThan, [ Validators.required ]],
  statementValueNotLessThan : [this.selectedSampleTestData.statementValueNotLessThan, [ Validators.required ]],
  measruingUnit : [this.selectedSampleTestData.measruingUnit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sampleTestDataService.update(this.sampleTestDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sampleTestDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sampleTestDataForm.get(name);
  }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}
