
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MainDataForTheSample } from 'app/shared/models/main-data-for-the-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MainDataForTheSampleService } from '../shared/main-data-for-the-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-main-data-for-the-sample-new',
  templateUrl: './main-data-for-the-sample-new.component.html',
  styleUrls: ['./main-data-for-the-sample-new.component.scss'],
  providers: [
    ]
})

export class MainDataForTheSampleNewComponent extends AppBaseComponent implements OnInit {
  mainDataForTheSampleForm: FormGroup;
  @Input() selectedMainDataForTheSample: MainDataForTheSample;
  errorMessages: FormControlError[] = [
        
  ];

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;
private standardValuesService: LookupService;

  
calibrationSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;
standardValueSelectOptions: MaterialSelectOptions;

  
	@ViewChild('calibration', { static: true }) CalibrationSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;
	@ViewChild('standardValue', { static: true }) StandardValueSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MainDataForTheSampleNewComponent>,
    public mainDataForTheSampleService: MainDataForTheSampleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMainDataForTheSample = new MainDataForTheSample();

    
	this.calibrationSelectOptions = new MaterialSelectOptions({
	 data: this.calibrationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعايرة',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحده',
	});

	this.standardValueSelectOptions = new MaterialSelectOptions({
	 data: this.standardValuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القيمة العيارية',
	});


    this.mainDataForTheSampleForm = this.formBuilder.group({
     
  id : [0],
  sampleSpecificationCode : [this.selectedMainDataForTheSample.sampleSpecificationCode, [ ]],
  basicMaterial : [this.selectedMainDataForTheSample.basicMaterial, [ Validators.required ]],
  subMaterial : [this.selectedMainDataForTheSample.subMaterial, [ Validators.required ]],
  testCode : [this.selectedMainDataForTheSample.testCode, [ Validators.required ]],
  samplesMinimumNumber : [this.selectedMainDataForTheSample.samplesMinimumNumber, [ Validators.required ]],
  calibration : [this.selectedMainDataForTheSample.calibration, [ Validators.required ]],
  unit : [this.selectedMainDataForTheSample.unit, [ Validators.required ]],
  standardValue : [this.selectedMainDataForTheSample.standardValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.mainDataForTheSampleService.create(this.mainDataForTheSampleForm.value)
        .pipe(switchMap(x => {
			return this.mainDataForTheSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.mainDataForTheSampleForm.get(name);
    }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.standardValuesService = new LookupService('standardvalues', this.http);
  }
 }
