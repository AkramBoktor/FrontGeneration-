
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeeBonus } from 'app/shared/models/employee-bonus';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBonusService } from '../shared/employee-bonus.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-bonus-new',
  templateUrl: './employee-bonus-new.component.html',
  styleUrls: ['./employee-bonus-new.component.scss'],
  providers: [
    ]
})

export class EmployeeBonusNewComponent extends AppBaseComponent implements OnInit {
  employeeBonusForm: FormGroup;
  @Input() selectedEmployeeBonus: EmployeeBonus;
  errorMessages: FormControlError[] = [
        
  ];

  private bonusesService: LookupService;

  
bounceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bounceType', { static: true }) BounceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeBonusNewComponent>,
    public employeeBonusService: EmployeeBonusService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBonus = new EmployeeBonus();

    
	this.bounceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاوة',
	});


    this.employeeBonusForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedEmployeeBonus.employeeCode, [ Validators.required ]],
  bounceAmount : [this.selectedEmployeeBonus.bounceAmount, [ Validators.required ]],
  bounceType : [this.selectedEmployeeBonus.bounceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeBonusService.create(this.employeeBonusForm.value)
        .pipe(switchMap(x => {
			return this.employeeBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeBonusForm.get(name);
    }

  initializeLookupServices() {
    this.bonusesService = new LookupService('bonuses', this.http);
  }
 }
