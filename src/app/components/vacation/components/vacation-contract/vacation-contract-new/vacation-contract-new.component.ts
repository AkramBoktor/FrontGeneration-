
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationContract } from 'app/shared/models/vacation-contract';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { VacationContractService } from '../shared/vacation-contract.service';


@Component({
  selector: 'app-vacation-contract-new',
  templateUrl: './vacation-contract-new.component.html',
  styleUrls: ['./vacation-contract-new.component.scss'],
  providers: [
    ]
})

export class VacationContractNewComponent extends AppBaseComponent implements OnInit {
  vacationContractForm: FormGroup;
  @Input() selectedVacationContract: VacationContract;
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
    @Optional() public dialogRef: MatDialogRef<VacationContractNewComponent>,
    public vacationContractService: VacationContractService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationContract = new VacationContract();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة المركزية',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة ',
	});


    this.vacationContractForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedVacationContract.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedVacationContract.employeeName, [ ]],
  regularPreviousVacations : [this.selectedVacationContract.regularPreviousVacations, [ ]],
  regularBalance : [this.selectedVacationContract.regularBalance, [ ]],
  casualBalance : [this.selectedVacationContract.casualBalance, [ ]],
  fromDate : [this.selectedVacationContract.fromDate, [ Validators.required ]],
  toDate : [this.selectedVacationContract.toDate, [ Validators.required ]],
  permission : [this.selectedVacationContract.permission, [ Validators.required ]],
  centralAdministration : [this.selectedVacationContract.centralAdministration, [ ]],
  subAdministration : [this.selectedVacationContract.subAdministration, [ ]],
  vacationsType : [this.selectedVacationContract.vacationsType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.vacationContractService.create(this.vacationContractForm.value)
        .pipe(switchMap(x => {
			return this.vacationContractService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.vacationContractForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
 }
