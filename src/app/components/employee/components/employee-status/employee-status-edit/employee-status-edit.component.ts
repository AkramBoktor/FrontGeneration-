
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeStatus } from 'app/shared/models/employee-status';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeStatusService } from '../shared/employee-status.service';




@Component({
  selector: 'app-employee-status-edit',
  templateUrl: './employee-status-edit.component.html',
  styleUrls: ['./employee-status-edit.component.scss'],
  providers: []
})

export class EmployeeStatusEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeStatus: EmployeeStatus;
  employeeStatusForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private employeeStatusesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeStatusDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeStatusEditComponent>,
    public employeeStatusService: EmployeeStatusService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeStatus = new EmployeeStatus();
    this.selectedEmployeeStatus = this.selectedEmployeeStatusDialog.data || this.selectedEmployeeStatus;

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحالة',
	});


    this.employeeStatusForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeStatus.id],
  employeeCode : [this.selectedEmployeeStatus.employeeCode, [ ]],
  statusStartDate : [this.selectedEmployeeStatus.statusStartDate, [ Validators.required ]],
  status : [this.selectedEmployeeStatus.status, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeStatusService.update(this.employeeStatusForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeStatusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeStatusForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
