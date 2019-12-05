
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TransferOfSupplyOrdersFromSchoolsClosure } from 'app/shared/models/transfer-of-supply-orders-from-schools-closure';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TransferOfSupplyOrdersFromSchoolsClosureService } from '../shared/transfer-of-supply-orders-from-schools-closure.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-transfer-of-supply-orders-from-schools-closure-view',
  templateUrl: './transfer-of-supply-orders-from-schools-closure-view.component.html',
  styleUrls: ['./transfer-of-supply-orders-from-schools-closure-view.component.scss'],
  providers: []
})

export class TransferOfSupplyOrdersFromSchoolsClosureViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferOfSupplyOrdersFromSchoolsClosure: TransferOfSupplyOrdersFromSchoolsClosure;
  transferOfSupplyOrdersFromSchoolsClosureForm: FormGroup;

  private closureTypesService: LookupService;

  
closureTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferOfSupplyOrdersFromSchoolsClosureDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferOfSupplyOrdersFromSchoolsClosureViewComponent>,
    public transferOfSupplyOrdersFromSchoolsClosureService: TransferOfSupplyOrdersFromSchoolsClosureService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferOfSupplyOrdersFromSchoolsClosure = this.selectedTransferOfSupplyOrdersFromSchoolsClosureDialog.data || this.selectedTransferOfSupplyOrdersFromSchoolsClosure;

    
	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});


    this.transferOfSupplyOrdersFromSchoolsClosureForm = this.formBuilder.group({
      
  closedBuildingNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closedBuildingNumber],
  buildingNumberTransferred : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.buildingNumberTransferred],
  annexNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.annexNumber],
  closureType : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closureType]
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
    return this.transferOfSupplyOrdersFromSchoolsClosureForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.transferOfSupplyOrdersFromSchoolsClosureForm.controls)) {
      this.transferOfSupplyOrdersFromSchoolsClosureForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}

