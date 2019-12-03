
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AddMaintenanceImplementation } from 'app/shared/models/add-maintenance-implementation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AddMaintenanceImplementationService } from '../shared/add-maintenance-implementation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-maintenance-implementation-edit',
  templateUrl: './add-maintenance-implementation-edit.component.html',
  styleUrls: ['./add-maintenance-implementation-edit.component.scss'],
  providers: []
})

export class AddMaintenanceImplementationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddMaintenanceImplementation: AddMaintenanceImplementation;
  addMaintenanceImplementationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private workTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddMaintenanceImplementationDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddMaintenanceImplementationEditComponent>,
    public addMaintenanceImplementationService: AddMaintenanceImplementationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddMaintenanceImplementation = new AddMaintenanceImplementation();
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


    this.addMaintenanceImplementationForm = this.formBuilder.group({
      
  id : [this.selectedAddMaintenanceImplementation.id],
  period : [this.selectedAddMaintenanceImplementation.period, [ Validators.required ]],
  maintainer : [this.selectedAddMaintenanceImplementation.maintainer, [ Validators.required ]],
  building : [this.selectedAddMaintenanceImplementation.building, [ Validators.required ]],
  code : [this.selectedAddMaintenanceImplementation.code, [ Validators.required ]],
  plannedDate : [this.selectedAddMaintenanceImplementation.plannedDate, [ Validators.required ]],
  actualDate : [this.selectedAddMaintenanceImplementation.actualDate, [ Validators.required ]],
  case : [this.selectedAddMaintenanceImplementation.case, [ Validators.required ]],
  doNotExecute : [this.selectedAddMaintenanceImplementation.doNotExecute, [ Validators.required ]],
  region : [this.selectedAddMaintenanceImplementation.region, [ Validators.required ]],
  laboratoryType : [this.selectedAddMaintenanceImplementation.laboratoryType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.addMaintenanceImplementationService.update(this.addMaintenanceImplementationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addMaintenanceImplementationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addMaintenanceImplementationForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}
