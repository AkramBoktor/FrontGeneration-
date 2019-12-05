
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Bonus57 } from 'app/shared/models/bonus-5-7';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Bonus57Service } from '../shared/bonus-5-7.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bonus-5-7-view',
  templateUrl: './bonus-5-7-view.component.html',
  styleUrls: ['./bonus-5-7-view.component.scss'],
  providers: []
})

export class Bonus57ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBonus57: Bonus57;
  bonus57Form: FormGroup;

  private financialDegreesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBonus57Dialog: any,
    @Optional() public dialogRef: MatDialogRef<Bonus57ViewComponent>,
    public bonus57Service: Bonus57Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBonus57 = this.selectedBonus57Dialog.data || this.selectedBonus57;

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.bonus57Form = this.formBuilder.group({
      
  employeeCode : [this.selectedBonus57.employeeCode],
  year : [this.selectedBonus57.year],
  employmentSalary : [this.selectedBonus57.employmentSalary],
  ratio : [this.selectedBonus57.ratio],
  periodBonus : [this.selectedBonus57.periodBonus],
  employmentSalaryWithBonus : [this.selectedBonus57.employmentSalaryWithBonus],
  financialDegree : [this.selectedBonus57.financialDegree]
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
    return this.bonus57Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.bonus57Form.controls)) {
      this.bonus57Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}

