
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PrintMaintenanceIndexationBuilding } from 'app/shared/models/print-maintenance-indexation-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PrintMaintenanceIndexationBuildingService } from '../shared/print-maintenance-indexation-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-print-maintenance-indexation-building-view',
  templateUrl: './print-maintenance-indexation-building-view.component.html',
  styleUrls: ['./print-maintenance-indexation-building-view.component.scss'],
  providers: []
})

export class PrintMaintenanceIndexationBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrintMaintenanceIndexationBuilding: PrintMaintenanceIndexationBuilding;
  printMaintenanceIndexationBuildingForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrintMaintenanceIndexationBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrintMaintenanceIndexationBuildingViewComponent>,
    public printMaintenanceIndexationBuildingService: PrintMaintenanceIndexationBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrintMaintenanceIndexationBuilding = this.selectedPrintMaintenanceIndexationBuildingDialog.data || this.selectedPrintMaintenanceIndexationBuilding;

    

    this.printMaintenanceIndexationBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedPrintMaintenanceIndexationBuilding.buildingCode],
  yearPlan : [this.selectedPrintMaintenanceIndexationBuilding.yearPlan],
  maintenanceType : [this.selectedPrintMaintenanceIndexationBuilding.maintenanceType],
  printType : [this.selectedPrintMaintenanceIndexationBuilding.printType]
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
    return this.printMaintenanceIndexationBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.printMaintenanceIndexationBuildingForm.controls)) {
      this.printMaintenanceIndexationBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

