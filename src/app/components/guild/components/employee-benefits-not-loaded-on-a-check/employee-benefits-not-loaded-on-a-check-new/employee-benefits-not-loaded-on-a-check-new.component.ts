
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeeBenefitsNotLoadedOnACheck } from 'app/shared/models/employee-benefits-not-loaded-on-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBenefitsNotLoadedOnACheckService } from '../shared/employee-benefits-not-loaded-on-a-check.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-benefits-not-loaded-on-a-check-new',
  templateUrl: './employee-benefits-not-loaded-on-a-check-new.component.html',
  styleUrls: ['./employee-benefits-not-loaded-on-a-check-new.component.scss'],
  providers: [
    ]
})

export class EmployeeBenefitsNotLoadedOnACheckNewComponent extends AppBaseComponent implements OnInit {
  employeeBenefitsNotLoadedOnACheckForm: FormGroup;
  @Input() selectedEmployeeBenefitsNotLoadedOnACheck: EmployeeBenefitsNotLoadedOnACheck;
  errorMessages: FormControlError[] = [
        
  ];

  private subDepartmentsService: LookupService;
private subsidyTypesService: LookupService;

  
affiliateManagementSelectOptions: MaterialSelectOptions;
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('affiliateManagement', { static: true }) AffiliateManagementSelectComponent: MaterialSelectComponent;
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsNotLoadedOnACheckNewComponent>,
    public employeeBenefitsNotLoadedOnACheckService: EmployeeBenefitsNotLoadedOnACheckService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsNotLoadedOnACheck = new EmployeeBenefitsNotLoadedOnACheck();

    
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
     
  id : [0],
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
    this.employeeBenefitsNotLoadedOnACheckService.create(this.employeeBenefitsNotLoadedOnACheckForm.value)
        .pipe(switchMap(x => {
			return this.employeeBenefitsNotLoadedOnACheckService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeBenefitsNotLoadedOnACheckForm.get(name);
    }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
 }
