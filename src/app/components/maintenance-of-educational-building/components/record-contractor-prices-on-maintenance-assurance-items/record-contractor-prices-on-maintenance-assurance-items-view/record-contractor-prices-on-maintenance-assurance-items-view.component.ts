
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordContractorPricesOnMaintenanceAssuranceItems } from 'app/shared/models/record-contractor-prices-on-maintenance-assurance-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordContractorPricesOnMaintenanceAssuranceItemsService } from '../shared/record-contractor-prices-on-maintenance-assurance-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-contractor-prices-on-maintenance-assurance-items-view',
  templateUrl: './record-contractor-prices-on-maintenance-assurance-items-view.component.html',
  styleUrls: ['./record-contractor-prices-on-maintenance-assurance-items-view.component.scss'],
  providers: []
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordContractorPricesOnMaintenanceAssuranceItems: RecordContractorPricesOnMaintenanceAssuranceItems;
  recordContractorPricesOnMaintenanceAssuranceItemsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordContractorPricesOnMaintenanceAssuranceItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent>,
    public recordContractorPricesOnMaintenanceAssuranceItemsService: RecordContractorPricesOnMaintenanceAssuranceItemsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordContractorPricesOnMaintenanceAssuranceItems = this.selectedRecordContractorPricesOnMaintenanceAssuranceItemsDialog.data || this.selectedRecordContractorPricesOnMaintenanceAssuranceItems;

    

    this.recordContractorPricesOnMaintenanceAssuranceItemsForm = this.formBuilder.group({
      
  buildingCode : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.buildingCode],
  yearPlan : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.yearPlan],
  maintenanceType : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.maintenanceType],
  itemCode : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.itemCode],
  itemName : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.itemName],
  price : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.price],
  quantity : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.quantity]
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
    return this.recordContractorPricesOnMaintenanceAssuranceItemsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordContractorPricesOnMaintenanceAssuranceItemsForm.controls)) {
      this.recordContractorPricesOnMaintenanceAssuranceItemsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

