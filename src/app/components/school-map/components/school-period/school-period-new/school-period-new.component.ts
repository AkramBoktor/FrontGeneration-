
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolPeriod } from 'app/shared/models/school-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolPeriodService } from '../shared/school-period.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-period-new',
  templateUrl: './school-period-new.component.html',
  styleUrls: ['./school-period-new.component.scss'],
  providers: [
    ]
})

export class SchoolPeriodNewComponent extends AppBaseComponent implements OnInit {
  schoolPeriodForm: FormGroup;
  @Input() selectedSchoolPeriod: SchoolPeriod;
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
    @Optional() public dialogRef: MatDialogRef<SchoolPeriodNewComponent>,
    public schoolPeriodService: SchoolPeriodService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolPeriod = new SchoolPeriod();

    
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
     
  id : [0],
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
    this.schoolPeriodService.create(this.schoolPeriodForm.value)
        .pipe(switchMap(x => {
			return this.schoolPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
