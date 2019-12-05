
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegistrationForm50 } from 'app/shared/models/registration-form-50';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationForm50Service } from '../shared/registration-form-50.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registration-form-50-new',
  templateUrl: './registration-form-50-new.component.html',
  styleUrls: ['./registration-form-50-new.component.scss'],
  providers: [
    ]
})

export class RegistrationForm50NewComponent extends AppBaseComponent implements OnInit {
  registrationForm50Form: FormGroup;
  @Input() selectedRegistrationForm50: RegistrationForm50;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private subDepartmentsService: LookupService;
private formSourcesService: LookupService;

  
areaSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
formSourceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('area', { static: true }) AreaSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('formSource', { static: true }) FormSourceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegistrationForm50NewComponent>,
    public registrationForm50Service: RegistrationForm50Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationForm50 = new RegistrationForm50();

    
	this.areaSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة ',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة',
	});

	this.formSourceSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستمارة',
	});


    this.registrationForm50Form = this.formBuilder.group({
     
  id : [0],
  budgetYear : [this.selectedRegistrationForm50.budgetYear, [ Validators.required ]],
  formDate : [this.selectedRegistrationForm50.formDate, [ Validators.required ]],
  formSerial : [this.selectedRegistrationForm50.formSerial, [ ]],
  formAmount : [this.selectedRegistrationForm50.formAmount, [ Validators.required ]],
  employeeCode : [this.selectedRegistrationForm50.employeeCode, [ Validators.required ]],
  statement : [this.selectedRegistrationForm50.statement, [ Validators.required ]],
  area : [this.selectedRegistrationForm50.area, [ Validators.required ]],
  administration : [this.selectedRegistrationForm50.administration, [ Validators.required ]],
  formSource : [this.selectedRegistrationForm50.formSource, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registrationForm50Service.create(this.registrationForm50Form.value)
        .pipe(switchMap(x => {
			return this.registrationForm50Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registrationForm50Form.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
  }
 }
