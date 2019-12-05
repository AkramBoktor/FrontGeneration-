
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SampleTestData } from 'app/shared/models/sample-test-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleTestDataService } from '../shared/sample-test-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sample-test-data-new',
  templateUrl: './sample-test-data-new.component.html',
  styleUrls: ['./sample-test-data-new.component.scss'],
  providers: [
    ]
})

export class SampleTestDataNewComponent extends AppBaseComponent implements OnInit {
  sampleTestDataForm: FormGroup;
  @Input() selectedSampleTestData: SampleTestData;
  errorMessages: FormControlError[] = [
        
  ];

  private measurementUnitsService: LookupService;

  
measruingUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SampleTestDataNewComponent>,
    public sampleTestDataService: SampleTestDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSampleTestData = new SampleTestData();

    
	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});


    this.sampleTestDataForm = this.formBuilder.group({
     
  id : [0],
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
    this.sampleTestDataService.create(this.sampleTestDataForm.value)
        .pipe(switchMap(x => {
			return this.sampleTestDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sampleTestDataForm.get(name);
    }

  initializeLookupServices() {
    this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
 }
