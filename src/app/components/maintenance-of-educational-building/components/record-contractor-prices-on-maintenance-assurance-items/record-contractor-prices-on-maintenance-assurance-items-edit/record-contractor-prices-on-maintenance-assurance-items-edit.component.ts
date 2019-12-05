
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordContractorPricesOnMaintenanceAssuranceItems } from 'app/shared/models/record-contractor-prices-on-maintenance-assurance-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordContractorPricesOnMaintenanceAssuranceItemsService } from '../shared/record-contractor-prices-on-maintenance-assurance-items.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-contractor-prices-on-maintenance-assurance-items-edit',
  templateUrl: './record-contractor-prices-on-maintenance-assurance-items-edit.component.html',
  styleUrls: ['./record-contractor-prices-on-maintenance-assurance-items-edit.component.scss'],
  providers: []
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordContractorPricesOnMaintenanceAssuranceItems: RecordContractorPricesOnMaintenanceAssuranceItems;
  recordContractorPricesOnMaintenanceAssuranceItemsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordContractorPricesOnMaintenanceAssuranceItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent>,
    public recordContractorPricesOnMaintenanceAssuranceItemsService: RecordContractorPricesOnMaintenanceAssuranceItemsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordContractorPricesOnMaintenanceAssuranceItems = new RecordContractorPricesOnMaintenanceAssuranceItems();
    this.selectedRecordContractorPricesOnMaintenanceAssuranceItems = this.selectedRecordContractorPricesOnMaintenanceAssuranceItemsDialog.data || this.selectedRecordContractorPricesOnMaintenanceAssuranceItems;

    

    this.recordContractorPricesOnMaintenanceAssuranceItemsForm = this.formBuilder.group({
      
  id : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.id],
  buildingCode : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.buildingCode, [ Validators.required ]],
  yearPlan : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.yearPlan, [ Validators.required ]],
  maintenanceType : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.maintenanceType, [ Validators.required ]],
  itemCode : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.itemCode, [ Validators.required ]],
  itemName : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.itemName, [ Validators.required ]],
  price : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.price, [ Validators.required ]],
  quantity : [this.selectedRecordContractorPricesOnMaintenanceAssuranceItems.quantity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordContractorPricesOnMaintenanceAssuranceItemsService.update(this.recordContractorPricesOnMaintenanceAssuranceItemsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordContractorPricesOnMaintenanceAssuranceItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordContractorPricesOnMaintenanceAssuranceItemsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
