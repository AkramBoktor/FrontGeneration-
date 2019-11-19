
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DependentName } from 'app/shared/models/dependent-name';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DependentNameService } from '../shared/dependent-name.service';

@Component({
  selector: 'app-dependent-name-view',
  templateUrl: './dependent-name-view.component.html',
  styleUrls: ['./dependent-name-view.component.scss'],
  providers: []
})

export class DependentNameViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDependentName: DependentName;
  dependentNameForm: FormGroup;

  private relationshipTypesService: LookupService;

  
relationshipTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDependentNameDialog: any,
    @Optional() public dialogRef: MatDialogRef<DependentNameViewComponent>,
    public dependentNameService: DependentNameService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDependentName = this.selectedDependentNameDialog.data || this.selectedDependentName;

    
	this.relationshipTypeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاقه',
	});


    this.dependentNameForm = this.formBuilder.group({
      
  employeeCode : [this.selectedDependentName.employeeCode],
  name : [this.selectedDependentName.name],
  birthDate : [this.selectedDependentName.birthDate],
  relationshipType : [this.selectedDependentName.relationshipType]
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
    return this.dependentNameForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dependentNameForm.controls)) {
      this.dependentNameForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}

