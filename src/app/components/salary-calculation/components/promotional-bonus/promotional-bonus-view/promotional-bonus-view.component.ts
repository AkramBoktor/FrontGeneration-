
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PromotionalBonus } from 'app/shared/models/promotional-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PromotionalBonusService } from '../shared/promotional-bonus.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-promotional-bonus-view',
  templateUrl: './promotional-bonus-view.component.html',
  styleUrls: ['./promotional-bonus-view.component.scss'],
  providers: []
})

export class PromotionalBonusViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPromotionalBonus: PromotionalBonus;
  promotionalBonusForm: FormGroup;

  private financialDegreesService: LookupService;
private bonusesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
bonusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPromotionalBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<PromotionalBonusViewComponent>,
    public promotionalBonusService: PromotionalBonusService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotionalBonus = this.selectedPromotionalBonusDialog.data || this.selectedPromotionalBonus;

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});

	this.bonusSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العلاوه',
	});


    this.promotionalBonusForm = this.formBuilder.group({
      
  employeeCode : [this.selectedPromotionalBonus.employeeCode],
  year : [this.selectedPromotionalBonus.year],
  employmentSalary : [this.selectedPromotionalBonus.employmentSalary],
  amount : [this.selectedPromotionalBonus.amount],
  ratio : [this.selectedPromotionalBonus.ratio],
  decisionNumber : [this.selectedPromotionalBonus.decisionNumber],
  decisionDate : [this.selectedPromotionalBonus.decisionDate],
  dueDate : [this.selectedPromotionalBonus.dueDate],
  employmentSalaryWithBonus : [this.selectedPromotionalBonus.employmentSalaryWithBonus],
  financialDegree : [this.selectedPromotionalBonus.financialDegree],
  bonus : [this.selectedPromotionalBonus.bonus]
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
    return this.promotionalBonusForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.promotionalBonusForm.controls)) {
      this.promotionalBonusForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.bonusesService = new LookupService('bonuses', this.http);
  }
}

