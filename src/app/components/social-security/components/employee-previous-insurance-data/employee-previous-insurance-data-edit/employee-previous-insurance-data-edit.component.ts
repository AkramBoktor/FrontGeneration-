
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeePreviousInsuranceData } from 'app/shared/models/employee-previous-insurance-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeePreviousInsuranceDataService } from '../shared/employee-previous-insurance-data.service';




@Component({
  selector: 'app-employee-previous-insurance-data-edit',
  templateUrl: './employee-previous-insurance-data-edit.component.html',
  styleUrls: ['./employee-previous-insurance-data-edit.component.scss'],
  providers: []
})

export class EmployeePreviousInsuranceDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeePreviousInsuranceData: EmployeePreviousInsuranceData;
  employeePreviousInsuranceDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sector', { static: true }) SectorSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeePreviousInsuranceDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeePreviousInsuranceDataEditComponent>,
    public employeePreviousInsuranceDataService: EmployeePreviousInsuranceDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePreviousInsuranceData = new EmployeePreviousInsuranceData();
    this.selectedEmployeePreviousInsuranceData = this.selectedEmployeePreviousInsuranceDataDialog.data || this.selectedEmployeePreviousInsuranceData;

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.employeePreviousInsuranceDataForm = this.formBuilder.group({
      
  id : [this.selectedEmployeePreviousInsuranceData.id],
  employeeCode : [this.selectedEmployeePreviousInsuranceData.employeeCode, [ Validators.required,Validators.minLength(1) ]],
  organization : [this.selectedEmployeePreviousInsuranceData.organization, [ Validators.required ]],
  fromDate : [this.selectedEmployeePreviousInsuranceData.fromDate, [ Validators.required ]],
  toDate : [this.selectedEmployeePreviousInsuranceData.toDate, [ Validators.required ]],
  sector : [this.selectedEmployeePreviousInsuranceData.sector, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeePreviousInsuranceDataService.update(this.employeePreviousInsuranceDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeePreviousInsuranceDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeePreviousInsuranceDataForm.get(name);
  }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}
