
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AbstractSalary } from 'app/shared/models/abstract-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractSalaryService } from '../shared/abstract-salary.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-salary-view',
  templateUrl: './abstract-salary-view.component.html',
  styleUrls: ['./abstract-salary-view.component.scss'],
  providers: []
})

export class AbstractSalaryViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractSalary: AbstractSalary;
  abstractSalaryForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractSalaryDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractSalaryViewComponent>,
    public abstractSalaryService: AbstractSalaryService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractSalary = this.selectedAbstractSalaryDialog.data || this.selectedAbstractSalary;

    

    this.abstractSalaryForm = this.formBuilder.group({
      
  employeeCode : [this.selectedAbstractSalary.employeeCode],
  year : [this.selectedAbstractSalary.year],
  abstractSalary : [this.selectedAbstractSalary.abstractSalary]
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
    return this.abstractSalaryForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.abstractSalaryForm.controls)) {
      this.abstractSalaryForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

