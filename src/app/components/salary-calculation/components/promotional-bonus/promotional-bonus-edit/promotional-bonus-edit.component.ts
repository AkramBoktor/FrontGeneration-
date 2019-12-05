
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PromotionalBonus } from 'app/shared/models/promotional-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PromotionalBonusService } from '../shared/promotional-bonus.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-promotional-bonus-edit',
  templateUrl: './promotional-bonus-edit.component.html',
  styleUrls: ['./promotional-bonus-edit.component.scss'],
  providers: []
})

export class PromotionalBonusEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPromotionalBonus: PromotionalBonus;
  promotionalBonusForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private financialDegreesService: LookupService;
private bonusesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
bonusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('bonus', { static: true }) BonusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPromotionalBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<PromotionalBonusEditComponent>,
    public promotionalBonusService: PromotionalBonusService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotionalBonus = new PromotionalBonus();
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
      
  id : [this.selectedPromotionalBonus.id],
  employeeCode : [this.selectedPromotionalBonus.employeeCode, [ Validators.required ]],
  year : [this.selectedPromotionalBonus.year, [ Validators.required ]],
  employmentSalary : [this.selectedPromotionalBonus.employmentSalary, [ Validators.required ]],
  amount : [this.selectedPromotionalBonus.amount, [ Validators.required ]],
  ratio : [this.selectedPromotionalBonus.ratio, [ Validators.required ]],
  decisionNumber : [this.selectedPromotionalBonus.decisionNumber, [ Validators.required ]],
  decisionDate : [this.selectedPromotionalBonus.decisionDate, [ Validators.required ]],
  dueDate : [this.selectedPromotionalBonus.dueDate, [ Validators.required ]],
  employmentSalaryWithBonus : [this.selectedPromotionalBonus.employmentSalaryWithBonus, [ Validators.required ]],
  financialDegree : [this.selectedPromotionalBonus.financialDegree, [ Validators.required ]],
  bonus : [this.selectedPromotionalBonus.bonus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.promotionalBonusService.update(this.promotionalBonusForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.promotionalBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.promotionalBonusForm.get(name);
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.bonusesService = new LookupService('bonuses', this.http);
  }
}
