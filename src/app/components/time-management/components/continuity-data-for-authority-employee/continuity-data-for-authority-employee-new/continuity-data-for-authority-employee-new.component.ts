
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContinuityDataForAuthorityEmployee } from 'app/shared/models/continuity-data-for-authority-employee';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ContinuityDataForAuthorityEmployeeService } from '../shared/continuity-data-for-authority-employee.service';


@Component({
  selector: 'app-continuity-data-for-authority-employee-new',
  templateUrl: './continuity-data-for-authority-employee-new.component.html',
  styleUrls: ['./continuity-data-for-authority-employee-new.component.scss'],
  providers: [
    ]
})

export class ContinuityDataForAuthorityEmployeeNewComponent extends AppBaseComponent implements OnInit {
  continuityDataForAuthorityEmployeeForm: FormGroup;
  @Input() selectedContinuityDataForAuthorityEmployee: ContinuityDataForAuthorityEmployee;
  errorMessages: FormControlError[] = [
        
  ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContinuityDataForAuthorityEmployeeNewComponent>,
    public continuityDataForAuthorityEmployeeService: ContinuityDataForAuthorityEmployeeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContinuityDataForAuthorityEmployee = new ContinuityDataForAuthorityEmployee();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});


    this.continuityDataForAuthorityEmployeeForm = this.formBuilder.group({
     
  id : [0],
  continueDay : [this.selectedContinuityDataForAuthorityEmployee.continueDay, [ Validators.required ]],
  employeeCode : [this.selectedContinuityDataForAuthorityEmployee.employeeCode, [ Validators.required ]],
  centralAdministration : [this.selectedContinuityDataForAuthorityEmployee.centralAdministration, [ Validators.required ]],
  subAdministration : [this.selectedContinuityDataForAuthorityEmployee.subAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.continuityDataForAuthorityEmployeeService.create(this.continuityDataForAuthorityEmployeeForm.value)
        .pipe(switchMap(x => {
			return this.continuityDataForAuthorityEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.continuityDataForAuthorityEmployeeForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
