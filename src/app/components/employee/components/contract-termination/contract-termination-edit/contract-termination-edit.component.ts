
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractTermination } from 'app/shared/models/contract-termination';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ContractTerminationService } from '../shared/contract-termination.service';




@Component({
  selector: 'app-contract-termination-edit',
  templateUrl: './contract-termination-edit.component.html',
  styleUrls: ['./contract-termination-edit.component.scss'],
  providers: []
})

export class ContractTerminationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractTermination: ContractTermination;
  contractTerminationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	}
      ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractTerminationDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractTerminationEditComponent>,
    public contractTerminationService: ContractTerminationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractTermination = new ContractTermination();
    this.selectedContractTermination = this.selectedContractTerminationDialog.data || this.selectedContractTermination;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});


    this.contractTerminationForm = this.formBuilder.group({
      
  id : [this.selectedContractTermination.id],
  employeeCode : [this.selectedContractTermination.employeeCode, [ Validators.required,Validators.minLength(1) ]],
  periodNumber : [this.selectedContractTermination.periodNumber, [ Validators.required,Validators.minLength(1) ]],
  periodStartDate : [this.selectedContractTermination.periodStartDate, [ ]],
  contractAmount : [this.selectedContractTermination.contractAmount, [ Validators.required,Validators.minLength(1) ]],
  hiringDate : [this.selectedContractTermination.hiringDate, [ Validators.required ]],
  terminationReason : [this.selectedContractTermination.terminationReason, [ Validators.required ]],
  terminationDate : [this.selectedContractTermination.terminationDate, [ Validators.required ]],
  notes : [this.selectedContractTermination.notes, [ ]],
  periodEndDate : [this.selectedContractTermination.periodEndDate, [ Validators.required ]],
  centralAdministration : [this.selectedContractTermination.centralAdministration, [ ]],
  subAdministration : [this.selectedContractTermination.subAdministration, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractTerminationService.update(this.contractTerminationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractTerminationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractTerminationForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
