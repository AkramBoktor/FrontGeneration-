
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolData } from 'app/shared/models/school-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolDataService } from '../shared/school-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-data-new',
  templateUrl: './school-data-new.component.html',
  styleUrls: ['./school-data-new.component.scss'],
  providers: [
    ]
})

export class SchoolDataNewComponent extends AppBaseComponent implements OnInit {
  schoolDataForm: FormGroup;
  @Input() selectedSchoolData: SchoolData;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;
private educationTypesService: LookupService;
private usagePeriodNumbersService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
dependencyCodeSelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;
educationQualityCodeSelectOptions: MaterialSelectOptions;
periodsOfUseNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('dependencyCode', { static: true }) DependencyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('phaseCode', { static: true }) PhaseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationQualityCode', { static: true }) EducationQualityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('periodsOfUseNumber', { static: true }) PeriodsOfUseNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolDataNewComponent>,
    public schoolDataService: SchoolDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolData = new SchoolData();

    
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

	this.dependencyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التبعية',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});

	this.educationQualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوعية التعليم',
	});

	this.periodsOfUseNumberSelectOptions = new MaterialSelectOptions({
	 data: this.usagePeriodNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'عدد فترات الاستخدام',
	});


    this.schoolDataForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedSchoolData.buildingCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedSchoolData.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedSchoolData.branchCode, [ Validators.required ]],
  dependencyCode : [this.selectedSchoolData.dependencyCode, [ Validators.required ]],
  phaseCode : [this.selectedSchoolData.phaseCode, [ Validators.required ]],
  educationQualityCode : [this.selectedSchoolData.educationQualityCode, [ Validators.required ]],
  periodsOfUseNumber : [this.selectedSchoolData.periodsOfUseNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolDataService.create(this.schoolDataForm.value)
        .pipe(switchMap(x => {
			return this.schoolDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolDataForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.usagePeriodNumbersService = new LookupService('usageperiodnumbers', this.http);
  }
 }
