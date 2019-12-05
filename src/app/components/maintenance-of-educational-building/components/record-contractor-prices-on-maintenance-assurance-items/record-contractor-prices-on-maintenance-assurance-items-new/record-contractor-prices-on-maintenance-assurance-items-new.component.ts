
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordContractorPricesOnMaintenanceAssuranceItems } from 'app/shared/models/record-contractor-prices-on-maintenance-assurance-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordContractorPricesOnMaintenanceAssuranceItemsService } from '../shared/record-contractor-prices-on-maintenance-assurance-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-contractor-prices-on-maintenance-assurance-items-new',
  templateUrl: './record-contractor-prices-on-maintenance-assurance-items-new.component.html',
  styleUrls: ['./record-contractor-prices-on-maintenance-assurance-items-new.component.scss'],
  providers: [
    ]
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent extends AppBaseComponent implements OnInit {
  recordContractorPricesOnMaintenanceAssuranceItemsForm: FormGroup;
  @Input() selectedRecordContractorPricesOnMaintenanceAssuranceItems: RecordContractorPricesOnMaintenanceAssuranceItems;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent>,
    public recordContractorPricesOnMaintenanceAssuranceItemsService: RecordContractorPricesOnMaintenanceAssuranceItemsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordContractorPricesOnMaintenanceAssuranceItems = new RecordContractorPricesOnMaintenanceAssuranceItems();

    

    this.recordContractorPricesOnMaintenanceAssuranceItemsForm = this.formBuilder.group({
     
  id : [0],
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
    this.recordContractorPricesOnMaintenanceAssuranceItemsService.create(this.recordContractorPricesOnMaintenanceAssuranceItemsForm.value)
        .pipe(switchMap(x => {
			return this.recordContractorPricesOnMaintenanceAssuranceItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordContractorPricesOnMaintenanceAssuranceItemsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
