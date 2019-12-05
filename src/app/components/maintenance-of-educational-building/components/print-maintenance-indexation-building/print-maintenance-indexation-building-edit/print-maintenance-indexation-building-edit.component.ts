
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PrintMaintenanceIndexationBuilding } from 'app/shared/models/print-maintenance-indexation-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PrintMaintenanceIndexationBuildingService } from '../shared/print-maintenance-indexation-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-print-maintenance-indexation-building-edit',
  templateUrl: './print-maintenance-indexation-building-edit.component.html',
  styleUrls: ['./print-maintenance-indexation-building-edit.component.scss'],
  providers: []
})

export class PrintMaintenanceIndexationBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrintMaintenanceIndexationBuilding: PrintMaintenanceIndexationBuilding;
  printMaintenanceIndexationBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrintMaintenanceIndexationBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrintMaintenanceIndexationBuildingEditComponent>,
    public printMaintenanceIndexationBuildingService: PrintMaintenanceIndexationBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrintMaintenanceIndexationBuilding = new PrintMaintenanceIndexationBuilding();
    this.selectedPrintMaintenanceIndexationBuilding = this.selectedPrintMaintenanceIndexationBuildingDialog.data || this.selectedPrintMaintenanceIndexationBuilding;

    

    this.printMaintenanceIndexationBuildingForm = this.formBuilder.group({
      
  id : [this.selectedPrintMaintenanceIndexationBuilding.id],
  buildingCode : [this.selectedPrintMaintenanceIndexationBuilding.buildingCode, [ Validators.required ]],
  yearPlan : [this.selectedPrintMaintenanceIndexationBuilding.yearPlan, [ Validators.required ]],
  maintenanceType : [this.selectedPrintMaintenanceIndexationBuilding.maintenanceType, [ Validators.required ]],
  printType : [this.selectedPrintMaintenanceIndexationBuilding.printType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.printMaintenanceIndexationBuildingService.update(this.printMaintenanceIndexationBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.printMaintenanceIndexationBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.printMaintenanceIndexationBuildingForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
