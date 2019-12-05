
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeBenefitsNotLoadedOnACheck } from 'app/shared/models/employee-benefits-not-loaded-on-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeeBenefitsNotLoadedOnACheckService } from '../shared/employee-benefits-not-loaded-on-a-check.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-benefits-not-loaded-on-a-check-edit',
  templateUrl: './employee-benefits-not-loaded-on-a-check-edit.component.html',
  styleUrls: ['./employee-benefits-not-loaded-on-a-check-edit.component.scss'],
  providers: []
})

export class EmployeeBenefitsNotLoadedOnACheckEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBenefitsNotLoadedOnACheck: EmployeeBenefitsNotLoadedOnACheck;
  employeeBenefitsNotLoadedOnACheckForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subDepartmentsService: LookupService;
private subsidyTypesService: LookupService;

  
affiliateManagementSelectOptions: MaterialSelectOptions;
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('affiliateManagement', { static: true }) AffiliateManagementSelectComponent: MaterialSelectComponent;
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBenefitsNotLoadedOnACheckDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsNotLoadedOnACheckEditComponent>,
    public employeeBenefitsNotLoadedOnACheckService: EmployeeBenefitsNotLoadedOnACheckService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsNotLoadedOnACheck = new EmployeeBenefitsNotLoadedOnACheck();
    this.selectedEmployeeBenefitsNotLoadedOnACheck = this.selectedEmployeeBenefitsNotLoadedOnACheckDialog.data || this.selectedEmployeeBenefitsNotLoadedOnACheck;

    
	this.affiliateManagementSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الاداره التابع لها',
	});

	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع الاعانه',
	});


    this.employeeBenefitsNotLoadedOnACheckForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeBenefitsNotLoadedOnACheck.id],
  employeeName : [this.selectedEmployeeBenefitsNotLoadedOnACheck.employeeName, [ Validators.required ]],
  subsidyNoandName : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyNoandName, [ Validators.required ]],
  subsidyAmount : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyAmount, [ Validators.required ]],
  exchangeDate : [this.selectedEmployeeBenefitsNotLoadedOnACheck.exchangeDate, [ Validators.required ]],
  receipt : [this.selectedEmployeeBenefitsNotLoadedOnACheck.receipt, [ Validators.required ]],
  affiliateManagement : [this.selectedEmployeeBenefitsNotLoadedOnACheck.affiliateManagement, [ Validators.required ]],
  subsidyType : [this.selectedEmployeeBenefitsNotLoadedOnACheck.subsidyType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeBenefitsNotLoadedOnACheckService.update(this.employeeBenefitsNotLoadedOnACheckForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeBenefitsNotLoadedOnACheckService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeBenefitsNotLoadedOnACheckForm.get(name);
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}
