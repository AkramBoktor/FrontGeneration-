
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeeBonus } from 'app/shared/models/employee-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBonusService } from '../shared/employee-bonus.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-bonus-view',
  templateUrl: './employee-bonus-view.component.html',
  styleUrls: ['./employee-bonus-view.component.scss'],
  providers: []
})

export class EmployeeBonusViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBonus: EmployeeBonus;
  employeeBonusForm: FormGroup;

  private bonusesService: LookupService;

  
bounceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBonusViewComponent>,
    public employeeBonusService: EmployeeBonusService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBonus = this.selectedEmployeeBonusDialog.data || this.selectedEmployeeBonus;

    
	this.bounceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاوة',
	});


    this.employeeBonusForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeBonus.employeeCode],
  bounceAmount : [this.selectedEmployeeBonus.bounceAmount],
  bounceType : [this.selectedEmployeeBonus.bounceType]
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
    return this.employeeBonusForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeBonusForm.controls)) {
      this.employeeBonusForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.bonusesService = new LookupService('bonuses', this.http);
  }
}

