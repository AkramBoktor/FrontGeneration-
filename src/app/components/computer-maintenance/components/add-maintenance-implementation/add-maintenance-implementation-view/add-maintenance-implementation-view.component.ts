
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddMaintenanceImplementation } from 'app/shared/models/add-maintenance-implementation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddMaintenanceImplementationService } from '../shared/add-maintenance-implementation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-maintenance-implementation-view',
  templateUrl: './add-maintenance-implementation-view.component.html',
  styleUrls: ['./add-maintenance-implementation-view.component.scss'],
  providers: []
})

export class AddMaintenanceImplementationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddMaintenanceImplementation: AddMaintenanceImplementation;
  addMaintenanceImplementationForm: FormGroup;

  private areasService: LookupService;
private workTypesService: LookupService;
private yesOrNosService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
doNotExecuteSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddMaintenanceImplementationDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddMaintenanceImplementationViewComponent>,
    public addMaintenanceImplementationService: AddMaintenanceImplementationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddMaintenanceImplementation = this.selectedAddMaintenanceImplementationDialog.data || this.selectedAddMaintenanceImplementation;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.doNotExecuteSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(ع.ت( عدم تنفيذ',
	});


    this.addMaintenanceImplementationForm = this.formBuilder.group({
      
  period : [this.selectedAddMaintenanceImplementation.period],
  maintainer : [this.selectedAddMaintenanceImplementation.maintainer],
  building : [this.selectedAddMaintenanceImplementation.building],
  code : [this.selectedAddMaintenanceImplementation.code],
  plannedDate : [this.selectedAddMaintenanceImplementation.plannedDate],
  actualDate : [this.selectedAddMaintenanceImplementation.actualDate],
  case : [this.selectedAddMaintenanceImplementation.case],
  region : [this.selectedAddMaintenanceImplementation.region],
  laboratoryType : [this.selectedAddMaintenanceImplementation.laboratoryType],
  doNotExecute : [this.selectedAddMaintenanceImplementation.doNotExecute]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.addMaintenanceImplementationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addMaintenanceImplementationForm.controls)) {
      this.addMaintenanceImplementationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

