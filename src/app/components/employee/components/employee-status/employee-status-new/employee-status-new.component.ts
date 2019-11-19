
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeStatus } from 'app/shared/models/employee-status';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeStatusService } from '../shared/employee-status.service';


@Component({
  selector: 'app-employee-status-new',
  templateUrl: './employee-status-new.component.html',
  styleUrls: ['./employee-status-new.component.scss'],
  providers: [
    ]
})

export class EmployeeStatusNewComponent extends AppBaseComponent implements OnInit {
  employeeStatusForm: FormGroup;
  @Input() selectedEmployeeStatus: EmployeeStatus;
  errorMessages: FormControlError[] = [
        
  ];

  private employeeStatusesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeStatusNewComponent>,
    public employeeStatusService: EmployeeStatusService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeStatus = new EmployeeStatus();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});


    this.employeeStatusForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedEmployeeStatus.employeeCode, [ Validators.required ]],
  statusStartDate : [this.selectedEmployeeStatus.statusStartDate, [ Validators.required ]],
  status : [this.selectedEmployeeStatus.status, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeStatusService.create(this.employeeStatusForm.value)
        .pipe(switchMap(x => {
			return this.employeeStatusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeStatusForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
