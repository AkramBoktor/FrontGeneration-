
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolPeriod } from 'app/shared/models/school-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolPeriodService } from '../shared/school-period.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-period-view',
  templateUrl: './school-period-view.component.html',
  styleUrls: ['./school-period-view.component.scss'],
  providers: []
})

export class SchoolPeriodViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolPeriod: SchoolPeriod;
  schoolPeriodForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private periodNumbersService: LookupService;
private pupilsTypesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
periodNumberSelectOptions: MaterialSelectOptions;
schoolPupilsTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolPeriodViewComponent>,
    public schoolPeriodService: SchoolPeriodService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedSchoolPeriod.buildingCode],
  schoolName : [this.selectedSchoolPeriod.schoolName],
  responsibleManager : [this.selectedSchoolPeriod.responsibleManager],
  schoolPupilsBoysNumber : [this.selectedSchoolPeriod.schoolPupilsBoysNumber],
  schoolPupilsGirlsNumber : [this.selectedSchoolPeriod.schoolPupilsGirlsNumber],
  regionalCenterCode : [this.selectedSchoolPeriod.regionalCenterCode],
  branchCode : [this.selectedSchoolPeriod.branchCode],
  periodNumber : [this.selectedSchoolPeriod.periodNumber],
  schoolPupilsType : [this.selectedSchoolPeriod.schoolPupilsType]
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
    return this.schoolPeriodForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolPeriodForm.controls)) {
      this.schoolPeriodForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.periodNumbersService = new LookupService('periodnumbers', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}

