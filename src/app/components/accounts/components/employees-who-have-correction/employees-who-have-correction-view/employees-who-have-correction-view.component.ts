
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeesWhoHaveCorrection } from 'app/shared/models/employees-who-have-correction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeesWhoHaveCorrectionService } from '../shared/employees-who-have-correction.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employees-who-have-correction-view',
  templateUrl: './employees-who-have-correction-view.component.html',
  styleUrls: ['./employees-who-have-correction-view.component.scss'],
  providers: []
})

export class EmployeesWhoHaveCorrectionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeesWhoHaveCorrection: EmployeesWhoHaveCorrection;
  employeesWhoHaveCorrectionForm: FormGroup;

  private entryTypesService: LookupService;

  
entryTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeesWhoHaveCorrectionDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeesWhoHaveCorrectionViewComponent>,
    public employeesWhoHaveCorrectionService: EmployeesWhoHaveCorrectionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesWhoHaveCorrection = this.selectedEmployeesWhoHaveCorrectionDialog.data || this.selectedEmployeesWhoHaveCorrection;

    
	this.entryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الادخال',
	});


    this.employeesWhoHaveCorrectionForm = this.formBuilder.group({
      
  incomingYearAndMonth : [this.selectedEmployeesWhoHaveCorrection.incomingYearAndMonth],
  employeeCode : [this.selectedEmployeesWhoHaveCorrection.employeeCode],
  employeeDate : [this.selectedEmployeesWhoHaveCorrection.employeeDate],
  entryType : [this.selectedEmployeesWhoHaveCorrection.entryType]
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
    return this.employeesWhoHaveCorrectionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeesWhoHaveCorrectionForm.controls)) {
      this.employeesWhoHaveCorrectionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entryTypesService = new LookupService('entrytypes', this.http);
  }
}

