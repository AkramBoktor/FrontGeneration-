
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeePreviousInsuranceData } from 'app/shared/models/employee-previous-insurance-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeePreviousInsuranceDataService } from '../shared/employee-previous-insurance-data.service';


@Component({
  selector: 'app-employee-previous-insurance-data-new',
  templateUrl: './employee-previous-insurance-data-new.component.html',
  styleUrls: ['./employee-previous-insurance-data-new.component.scss'],
  providers: [
    ]
})

export class EmployeePreviousInsuranceDataNewComponent extends AppBaseComponent implements OnInit {
  employeePreviousInsuranceDataForm: FormGroup;
  @Input() selectedEmployeePreviousInsuranceData: EmployeePreviousInsuranceData;
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
    @Optional() public dialogRef: MatDialogRef<EmployeePreviousInsuranceDataNewComponent>,
    public employeePreviousInsuranceDataService: EmployeePreviousInsuranceDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePreviousInsuranceData = new EmployeePreviousInsuranceData();

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.employeePreviousInsuranceDataForm = this.formBuilder.group({
     
  id : [0],
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
    this.employeePreviousInsuranceDataService.create(this.employeePreviousInsuranceDataForm.value)
        .pipe(switchMap(x => {
			return this.employeePreviousInsuranceDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeePreviousInsuranceDataForm.get(name);
    }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
 }
