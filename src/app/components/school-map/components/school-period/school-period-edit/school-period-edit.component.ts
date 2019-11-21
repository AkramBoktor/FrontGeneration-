
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolPeriod } from 'app/shared/models/school-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolPeriodService } from '../shared/school-period.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-period-edit',
  templateUrl: './school-period-edit.component.html',
  styleUrls: ['./school-period-edit.component.scss'],
  providers: []
})

export class SchoolPeriodEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolPeriod: SchoolPeriod;
  schoolPeriodForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private periodNumbersService: LookupService;
private pupilsTypesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
periodNumberSelectOptions: MaterialSelectOptions;
schoolPupilsTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('periodNumber', { static: true }) PeriodNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('schoolPupilsType', { static: true }) SchoolPupilsTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolPeriodEditComponent>,
    public schoolPeriodService: SchoolPeriodService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolPeriod = new SchoolPeriod();
    this.selectedSchoolPeriod = this.selectedSchoolPeriodDialog.data || this.selectedSchoolPeriod;

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.periodNumberSelectOptions = new MaterialSelectOptions({
	 data: this.periodNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفترة',
	});

	this.schoolPupilsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع تلاميذ المدرسة',
	});


    this.schoolPeriodForm = this.formBuilder.group({
      
  id : [this.selectedSchoolPeriod.id],
  buildingCode : [this.selectedSchoolPeriod.buildingCode, [ Validators.required ]],
  schoolName : [this.selectedSchoolPeriod.schoolName, [ Validators.required ]],
  responsibleManager : [this.selectedSchoolPeriod.responsibleManager, [ Validators.required ]],
  schoolPupilsBoysNumber : [this.selectedSchoolPeriod.schoolPupilsBoysNumber, [ Validators.required ]],
  schoolPupilsGirlsNumber : [this.selectedSchoolPeriod.schoolPupilsGirlsNumber, [ Validators.required ]],
  regionalCenterCode : [this.selectedSchoolPeriod.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedSchoolPeriod.branchCode, [ Validators.required ]],
  periodNumber : [this.selectedSchoolPeriod.periodNumber, [ Validators.required ]],
  schoolPupilsType : [this.selectedSchoolPeriod.schoolPupilsType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.schoolPeriodService.update(this.schoolPeriodForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolPeriodForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.periodNumbersService = new LookupService('periodnumbers', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}
