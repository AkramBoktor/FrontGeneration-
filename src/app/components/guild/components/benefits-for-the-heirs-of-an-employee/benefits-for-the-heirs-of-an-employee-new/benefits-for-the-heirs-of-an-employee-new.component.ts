
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BenefitsForTheHeirsOfAnEmployee } from 'app/shared/models/benefits-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BenefitsForTheHeirsOfAnEmployeeService } from '../shared/benefits-for-the-heirs-of-an-employee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-benefits-for-the-heirs-of-an-employee-new',
  templateUrl: './benefits-for-the-heirs-of-an-employee-new.component.html',
  styleUrls: ['./benefits-for-the-heirs-of-an-employee-new.component.scss'],
  providers: [
    ]
})

export class BenefitsForTheHeirsOfAnEmployeeNewComponent extends AppBaseComponent implements OnInit {
  benefitsForTheHeirsOfAnEmployeeForm: FormGroup;
  @Input() selectedBenefitsForTheHeirsOfAnEmployee: BenefitsForTheHeirsOfAnEmployee;
  errorMessages: FormControlError[] = [
        
  ];

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BenefitsForTheHeirsOfAnEmployeeNewComponent>,
    public benefitsForTheHeirsOfAnEmployeeService: BenefitsForTheHeirsOfAnEmployeeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBenefitsForTheHeirsOfAnEmployee = new BenefitsForTheHeirsOfAnEmployee();

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.benefitsForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
     
  id : [0],
  checkNumber : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkDate, [ ]],
  checkAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkAmount, [ Validators.required ]],
  employeeCode : [this.selectedBenefitsForTheHeirsOfAnEmployee.employeeCode, [ Validators.required ]],
  subsidyAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyAmount, [ Validators.required ]],
  heirCheckNo : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckNo, [ Validators.required ]],
  heirCheckDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckDate, [ Validators.required ]],
  heirName : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirName, [ Validators.required ]],
  amount : [this.selectedBenefitsForTheHeirsOfAnEmployee.amount, [ Validators.required ]],
  subsidyType : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.benefitsForTheHeirsOfAnEmployeeService.create(this.benefitsForTheHeirsOfAnEmployeeForm.value)
        .pipe(switchMap(x => {
			return this.benefitsForTheHeirsOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.benefitsForTheHeirsOfAnEmployeeForm.get(name);
    }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
 }
