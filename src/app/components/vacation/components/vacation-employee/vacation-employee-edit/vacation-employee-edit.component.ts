
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationEmployee } from 'app/shared/models/vacation-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { VacationEmployeeService } from '../shared/vacation-employee.service';




@Component({
  selector: 'app-vacation-employee-edit',
  templateUrl: './vacation-employee-edit.component.html',
  styleUrls: ['./vacation-employee-edit.component.scss'],
  providers: []
})

export class VacationEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationEmployee: VacationEmployee;
  vacationEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private vacationTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
vacationsTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('vacationsType', { static: true }) VacationsTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationEmployeeEditComponent>,
    public vacationEmployeeService: VacationEmployeeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationEmployee = new VacationEmployee();
    this.selectedVacationEmployee = this.selectedVacationEmployeeDialog.data || this.selectedVacationEmployee;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه ',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.vacationEmployeeForm = this.formBuilder.group({
      
  id : [this.selectedVacationEmployee.id],
  employeeCode : [this.selectedVacationEmployee.employeeCode, [ ]],
  employeeName : [this.selectedVacationEmployee.employeeName, [ ]],
  regularPreviousVacations : [this.selectedVacationEmployee.regularPreviousVacations, [ ]],
  regularBalance : [this.selectedVacationEmployee.regularBalance, [ ]],
  casualBalance : [this.selectedVacationEmployee.casualBalance, [ ]],
  fromDate : [this.selectedVacationEmployee.fromDate, [ Validators.required ]],
  toDate : [this.selectedVacationEmployee.toDate, [ Validators.required ]],
  permission : [this.selectedVacationEmployee.permission, [ Validators.required ]],
  decisionNumber : [this.selectedVacationEmployee.decisionNumber, [ Validators.required ]],
  decisionDate : [this.selectedVacationEmployee.decisionDate, [ Validators.required ]],
  centralAdministration : [this.selectedVacationEmployee.centralAdministration, [ ]],
  subAdministration : [this.selectedVacationEmployee.subAdministration, [ ]],
  vacationsType : [this.selectedVacationEmployee.vacationsType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.vacationEmployeeService.update(this.vacationEmployeeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.vacationEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.vacationEmployeeForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}
