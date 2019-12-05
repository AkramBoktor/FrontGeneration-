
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Bonus57 } from 'app/shared/models/bonus-5-7';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { Bonus57Service } from '../shared/bonus-5-7.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bonus-5-7-new',
  templateUrl: './bonus-5-7-new.component.html',
  styleUrls: ['./bonus-5-7-new.component.scss'],
  providers: [
    ]
})

export class Bonus57NewComponent extends AppBaseComponent implements OnInit {
  bonus57Form: FormGroup;
  @Input() selectedBonus57: Bonus57;
  errorMessages: FormControlError[] = [
        
  ];

  private financialDegreesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<Bonus57NewComponent>,
    public bonus57Service: Bonus57Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBonus57 = new Bonus57();

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.bonus57Form = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedBonus57.employeeCode, [ Validators.required ]],
  year : [this.selectedBonus57.year, [ Validators.required ]],
  employmentSalary : [this.selectedBonus57.employmentSalary, [ Validators.required ]],
  ratio : [this.selectedBonus57.ratio, [ Validators.required ]],
  periodBonus : [this.selectedBonus57.periodBonus, [ Validators.required ]],
  employmentSalaryWithBonus : [this.selectedBonus57.employmentSalaryWithBonus, [ Validators.required ]],
  financialDegree : [this.selectedBonus57.financialDegree, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.bonus57Service.create(this.bonus57Form.value)
        .pipe(switchMap(x => {
			return this.bonus57Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.bonus57Form.get(name);
    }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
 }
