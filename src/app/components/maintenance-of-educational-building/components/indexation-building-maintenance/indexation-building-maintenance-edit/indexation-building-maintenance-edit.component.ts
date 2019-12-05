
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IndexationBuildingMaintenance } from 'app/shared/models/indexation-building-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IndexationBuildingMaintenanceService } from '../shared/indexation-building-maintenance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-indexation-building-maintenance-edit',
  templateUrl: './indexation-building-maintenance-edit.component.html',
  styleUrls: ['./indexation-building-maintenance-edit.component.scss'],
  providers: []
})

export class IndexationBuildingMaintenanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIndexationBuildingMaintenance: IndexationBuildingMaintenance;
  indexationBuildingMaintenanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIndexationBuildingMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<IndexationBuildingMaintenanceEditComponent>,
    public indexationBuildingMaintenanceService: IndexationBuildingMaintenanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationBuildingMaintenance = new IndexationBuildingMaintenance();
    this.selectedIndexationBuildingMaintenance = this.selectedIndexationBuildingMaintenanceDialog.data || this.selectedIndexationBuildingMaintenance;

    

    this.indexationBuildingMaintenanceForm = this.formBuilder.group({
      
  id : [this.selectedIndexationBuildingMaintenance.id],
  buildingCode : [this.selectedIndexationBuildingMaintenance.buildingCode, [ Validators.required ]],
  yearPlan : [this.selectedIndexationBuildingMaintenance.yearPlan, [ Validators.required ]],
  maintenanceType : [this.selectedIndexationBuildingMaintenance.maintenanceType, [ Validators.required ]],
  yearPricing : [this.selectedIndexationBuildingMaintenance.yearPricing, [ Validators.required ]],
  employmentType : [this.selectedIndexationBuildingMaintenance.employmentType, [ Validators.required ]],
  extensionCode : [this.selectedIndexationBuildingMaintenance.extensionCode, [ Validators.required ]],
  floorNumber : [this.selectedIndexationBuildingMaintenance.floorNumber, [ Validators.required ]],
  spaceCode : [this.selectedIndexationBuildingMaintenance.spaceCode, [ Validators.required ]],
  itemCode : [this.selectedIndexationBuildingMaintenance.itemCode, [ Validators.required ]],
  itemName : [this.selectedIndexationBuildingMaintenance.itemName, [ Validators.required ]],
  quantity : [this.selectedIndexationBuildingMaintenance.quantity, [ Validators.required ]],
  price : [this.selectedIndexationBuildingMaintenance.price, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.indexationBuildingMaintenanceService.update(this.indexationBuildingMaintenanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.indexationBuildingMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.indexationBuildingMaintenanceForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
