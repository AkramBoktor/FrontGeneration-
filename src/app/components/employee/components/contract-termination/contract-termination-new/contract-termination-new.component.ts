
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractTermination } from 'app/shared/models/contract-termination';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ContractTerminationService } from '../shared/contract-termination.service';


@Component({
  selector: 'app-contract-termination-new',
  templateUrl: './contract-termination-new.component.html',
  styleUrls: ['./contract-termination-new.component.scss'],
  providers: [
    ]
})

export class ContractTerminationNewComponent extends AppBaseComponent implements OnInit {
  contractTerminationForm: FormGroup;
  @Input() selectedContractTermination: ContractTermination;
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
    @Optional() public dialogRef: MatDialogRef<ContractTerminationNewComponent>,
    public contractTerminationService: ContractTerminationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractTermination = new ContractTermination();

    
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
     
  id : [0],
  employeeCode : [this.selectedContractTermination.employeeCode, [ Validators.required,Validators.minLength(1) ]],
  periodNumber : [this.selectedContractTermination.periodNumber, [ ]],
  periodStartDate : [this.selectedContractTermination.periodStartDate, [ ]],
  contractAmount : [this.selectedContractTermination.contractAmount, [ ]],
  hiringDate : [this.selectedContractTermination.hiringDate, [ ]],
  terminationReason : [this.selectedContractTermination.terminationReason, [ Validators.required ]],
  terminationDate : [this.selectedContractTermination.terminationDate, [ Validators.required ]],
  notes : [this.selectedContractTermination.notes, [ ]],
  periodEndDate : [this.selectedContractTermination.periodEndDate, [ ]],
  centralAdministration : [this.selectedContractTermination.centralAdministration, [ ]],
  subAdministration : [this.selectedContractTermination.subAdministration, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contractTerminationService.create(this.contractTerminationForm.value)
        .pipe(switchMap(x => {
			return this.contractTerminationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractTerminationForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
