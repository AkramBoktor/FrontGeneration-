
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegistrationForm50 } from 'app/shared/models/registration-form-50';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationForm50Service } from '../shared/registration-form-50.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-form-50-view',
  templateUrl: './registration-form-50-view.component.html',
  styleUrls: ['./registration-form-50-view.component.scss'],
  providers: []
})

export class RegistrationForm50ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegistrationForm50: RegistrationForm50;
  registrationForm50Form: FormGroup;

  private areasService: LookupService;
private subDepartmentsService: LookupService;
private formSourcesService: LookupService;

  
areaSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
formSourceSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegistrationForm50Dialog: any,
    @Optional() public dialogRef: MatDialogRef<RegistrationForm50ViewComponent>,
    public registrationForm50Service: RegistrationForm50Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationForm50 = this.selectedRegistrationForm50Dialog.data || this.selectedRegistrationForm50;

    
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
      
  budgetYear : [this.selectedRegistrationForm50.budgetYear],
  formDate : [this.selectedRegistrationForm50.formDate],
  formSerial : [this.selectedRegistrationForm50.formSerial],
  formAmount : [this.selectedRegistrationForm50.formAmount],
  employeeCode : [this.selectedRegistrationForm50.employeeCode],
  statement : [this.selectedRegistrationForm50.statement],
  area : [this.selectedRegistrationForm50.area],
  administration : [this.selectedRegistrationForm50.administration],
  formSource : [this.selectedRegistrationForm50.formSource]
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
    return this.registrationForm50Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registrationForm50Form.controls)) {
      this.registrationForm50Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
  }
}

