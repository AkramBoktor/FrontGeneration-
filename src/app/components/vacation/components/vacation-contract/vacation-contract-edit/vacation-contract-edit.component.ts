
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationContract } from 'app/shared/models/vacation-contract';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { VacationContractService } from '../shared/vacation-contract.service';




@Component({
  selector: 'app-vacation-contract-edit',
  templateUrl: './vacation-contract-edit.component.html',
  styleUrls: ['./vacation-contract-edit.component.scss'],
  providers: []
})

export class VacationContractEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationContract: VacationContract;
  vacationContractForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationContractDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationContractEditComponent>,
    public vacationContractService: VacationContractService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationContract = new VacationContract();
    this.selectedVacationContract = this.selectedVacationContractDialog.data || this.selectedVacationContract;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة المركزية ',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية ',
	});

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة ',
	});


    this.vacationContractForm = this.formBuilder.group({
      
  id : [this.selectedVacationContract.id],
  employeeCode : [this.selectedVacationContract.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedVacationContract.employeeName, [ Validators.required ]],
  regularPreviousVacations : [this.selectedVacationContract.regularPreviousVacations, [ Validators.required ]],
  regularBalance : [this.selectedVacationContract.regularBalance, [ Validators.required ]],
  casualBalance : [this.selectedVacationContract.casualBalance, [ Validators.required ]],
  fromDate : [this.selectedVacationContract.fromDate, [ Validators.required ]],
  toDate : [this.selectedVacationContract.toDate, [ Validators.required ]],
  permission : [this.selectedVacationContract.permission, [ Validators.required ]],
  centralAdministration : [this.selectedVacationContract.centralAdministration, [ Validators.required ]],
  subAdministration : [this.selectedVacationContract.subAdministration, [ Validators.required ]],
  vacationsType : [this.selectedVacationContract.vacationsType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.vacationContractService.update(this.vacationContractForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.vacationContractService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.vacationContractForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}
