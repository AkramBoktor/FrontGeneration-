
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeBonus } from 'app/shared/models/employee-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeeBonusService } from '../shared/employee-bonus.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-bonus-edit',
  templateUrl: './employee-bonus-edit.component.html',
  styleUrls: ['./employee-bonus-edit.component.scss'],
  providers: []
})

export class EmployeeBonusEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBonus: EmployeeBonus;
  employeeBonusForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bonusesService: LookupService;

  
bounceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bounceType', { static: true }) BounceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBonusEditComponent>,
    public employeeBonusService: EmployeeBonusService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBonus = new EmployeeBonus();
    this.selectedEmployeeBonus = this.selectedEmployeeBonusDialog.data || this.selectedEmployeeBonus;

    
	this.bounceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاوة',
	});


    this.employeeBonusForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeBonus.id],
  employeeCode : [this.selectedEmployeeBonus.employeeCode, [ Validators.required ]],
  bounceAmount : [this.selectedEmployeeBonus.bounceAmount, [ Validators.required ]],
  bounceType : [this.selectedEmployeeBonus.bounceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeBonusService.update(this.employeeBonusForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeBonusForm.get(name);
  }

  initializeLookupServices() {
    this.bonusesService = new LookupService('bonuses', this.http);
  }
}
