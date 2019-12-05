
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IndexationBuildingMaintenance } from 'app/shared/models/indexation-building-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IndexationBuildingMaintenanceService } from '../shared/indexation-building-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-indexation-building-maintenance-view',
  templateUrl: './indexation-building-maintenance-view.component.html',
  styleUrls: ['./indexation-building-maintenance-view.component.scss'],
  providers: []
})

export class IndexationBuildingMaintenanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIndexationBuildingMaintenance: IndexationBuildingMaintenance;
  indexationBuildingMaintenanceForm: FormGroup;

  private maintenanceTypesService: LookupService;

  
maintenanceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIndexationBuildingMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<IndexationBuildingMaintenanceViewComponent>,
    public indexationBuildingMaintenanceService: IndexationBuildingMaintenanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationBuildingMaintenance = this.selectedIndexationBuildingMaintenanceDialog.data || this.selectedIndexationBuildingMaintenance;

    
	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الصيانه',
	});


    this.indexationBuildingMaintenanceForm = this.formBuilder.group({
      
  buildingCode : [this.selectedIndexationBuildingMaintenance.buildingCode],
  yearPlan : [this.selectedIndexationBuildingMaintenance.yearPlan],
  yearPricing : [this.selectedIndexationBuildingMaintenance.yearPricing],
  employmentType : [this.selectedIndexationBuildingMaintenance.employmentType],
  extensionCode : [this.selectedIndexationBuildingMaintenance.extensionCode],
  floorNumber : [this.selectedIndexationBuildingMaintenance.floorNumber],
  spaceCode : [this.selectedIndexationBuildingMaintenance.spaceCode],
  itemCode : [this.selectedIndexationBuildingMaintenance.itemCode],
  itemName : [this.selectedIndexationBuildingMaintenance.itemName],
  quantity : [this.selectedIndexationBuildingMaintenance.quantity],
  price : [this.selectedIndexationBuildingMaintenance.price],
  maintenanceType : [this.selectedIndexationBuildingMaintenance.maintenanceType]
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
    return this.indexationBuildingMaintenanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.indexationBuildingMaintenanceForm.controls)) {
      this.indexationBuildingMaintenanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
  }
}

