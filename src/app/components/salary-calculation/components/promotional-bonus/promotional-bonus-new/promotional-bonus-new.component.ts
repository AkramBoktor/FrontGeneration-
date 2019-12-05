
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PromotionalBonus } from 'app/shared/models/promotional-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PromotionalBonusService } from '../shared/promotional-bonus.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-promotional-bonus-new',
  templateUrl: './promotional-bonus-new.component.html',
  styleUrls: ['./promotional-bonus-new.component.scss'],
  providers: [
    ]
})

export class PromotionalBonusNewComponent extends AppBaseComponent implements OnInit {
  promotionalBonusForm: FormGroup;
  @Input() selectedPromotionalBonus: PromotionalBonus;
  errorMessages: FormControlError[] = [
        
  ];

  private financialDegreesService: LookupService;
private bonusesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
bonusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('bonus', { static: true }) BonusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PromotionalBonusNewComponent>,
    public promotionalBonusService: PromotionalBonusService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotionalBonus = new PromotionalBonus();

    
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
     
  id : [0],
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
    this.promotionalBonusService.create(this.promotionalBonusForm.value)
        .pipe(switchMap(x => {
			return this.promotionalBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.promotionalBonusForm.get(name);
    }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.bonusesService = new LookupService('bonuses', this.http);
  }
 }
