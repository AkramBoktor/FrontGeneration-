
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Bonus57 } from 'app/shared/models/bonus-5-7';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { Bonus57Service } from '../shared/bonus-5-7.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bonus-5-7-edit',
  templateUrl: './bonus-5-7-edit.component.html',
  styleUrls: ['./bonus-5-7-edit.component.scss'],
  providers: []
})

export class Bonus57EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBonus57: Bonus57;
  bonus57Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private financialDegreesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBonus57Dialog: any,
    @Optional() public dialogRef: MatDialogRef<Bonus57EditComponent>,
    public bonus57Service: Bonus57Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBonus57 = new Bonus57();
    this.selectedBonus57 = this.selectedBonus57Dialog.data || this.selectedBonus57;

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.bonus57Form = this.formBuilder.group({
      
  id : [this.selectedBonus57.id],
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
    this.bonus57Service.update(this.bonus57Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.bonus57Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.bonus57Form.get(name);
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}
