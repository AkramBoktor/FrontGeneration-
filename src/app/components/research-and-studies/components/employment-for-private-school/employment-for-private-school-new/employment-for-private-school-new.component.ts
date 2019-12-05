
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmploymentForPrivateSchool } from 'app/shared/models/employment-for-private-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmploymentForPrivateSchoolService } from '../shared/employment-for-private-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employment-for-private-school-new',
  templateUrl: './employment-for-private-school-new.component.html',
  styleUrls: ['./employment-for-private-school-new.component.scss'],
  providers: [
    ]
})

export class EmploymentForPrivateSchoolNewComponent extends AppBaseComponent implements OnInit {
  employmentForPrivateSchoolForm: FormGroup;
  @Input() selectedEmploymentForPrivateSchool: EmploymentForPrivateSchool;
  errorMessages: FormControlError[] = [
        
  ];

  private operationTypesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;

  
operationTypeSelectOptions: MaterialSelectOptions;
schoolDependencySelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('operationType', { static: true }) OperationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('schoolDependency', { static: true }) SchoolDependencySelectComponent: MaterialSelectComponent;
	@ViewChild('phaseCode', { static: true }) PhaseCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmploymentForPrivateSchoolNewComponent>,
    public employmentForPrivateSchoolService: EmploymentForPrivateSchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmploymentForPrivateSchool = new EmploymentForPrivateSchool();

    
	this.operationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.operationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التشغيل',
	});

	this.schoolDependencySelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تبعية مدرسة خ',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});


    this.employmentForPrivateSchoolForm = this.formBuilder.group({
     
  id : [0],
  schoolCode : [this.selectedEmploymentForPrivateSchool.schoolCode, [ Validators.required ]],
  approvalDate : [this.selectedEmploymentForPrivateSchool.approvalDate, [ Validators.required ]],
  operationDate : [this.selectedEmploymentForPrivateSchool.operationDate, [ Validators.required ]],
  notes : [this.selectedEmploymentForPrivateSchool.notes, [ Validators.required ]],
  classesNumber : [this.selectedEmploymentForPrivateSchool.classesNumber, [ Validators.required ]],
  operationType : [this.selectedEmploymentForPrivateSchool.operationType, [ Validators.required ]],
  schoolDependency : [this.selectedEmploymentForPrivateSchool.schoolDependency, [ Validators.required ]],
  phaseCode : [this.selectedEmploymentForPrivateSchool.phaseCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employmentForPrivateSchoolService.create(this.employmentForPrivateSchoolForm.value)
        .pipe(switchMap(x => {
			return this.employmentForPrivateSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employmentForPrivateSchoolForm.get(name);
    }

  initializeLookupServices() {
    this.operationTypesService = new LookupService('operationtypes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
 }
