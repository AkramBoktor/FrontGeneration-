
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContinuityDataForAuthorityEmployee } from 'app/shared/models/continuity-data-for-authority-employee';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ContinuityDataForAuthorityEmployeeService } from '../shared/continuity-data-for-authority-employee.service';




@Component({
  selector: 'app-continuity-data-for-authority-employee-edit',
  templateUrl: './continuity-data-for-authority-employee-edit.component.html',
  styleUrls: ['./continuity-data-for-authority-employee-edit.component.scss'],
  providers: []
})

export class ContinuityDataForAuthorityEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContinuityDataForAuthorityEmployee: ContinuityDataForAuthorityEmployee;
  continuityDataForAuthorityEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContinuityDataForAuthorityEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContinuityDataForAuthorityEmployeeEditComponent>,
    public continuityDataForAuthorityEmployeeService: ContinuityDataForAuthorityEmployeeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContinuityDataForAuthorityEmployee = new ContinuityDataForAuthorityEmployee();
    this.selectedContinuityDataForAuthorityEmployee = this.selectedContinuityDataForAuthorityEmployeeDialog.data || this.selectedContinuityDataForAuthorityEmployee;

    
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
      
  id : [this.selectedContinuityDataForAuthorityEmployee.id],
  continueDay : [this.selectedContinuityDataForAuthorityEmployee.continueDay, [ Validators.required ]],
  employeeCode : [this.selectedContinuityDataForAuthorityEmployee.employeeCode, [ Validators.required ]],
  centralAdministration : [this.selectedContinuityDataForAuthorityEmployee.centralAdministration, [ Validators.required ]],
  subAdministration : [this.selectedContinuityDataForAuthorityEmployee.subAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.continuityDataForAuthorityEmployeeService.update(this.continuityDataForAuthorityEmployeeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.continuityDataForAuthorityEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.continuityDataForAuthorityEmployeeForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
