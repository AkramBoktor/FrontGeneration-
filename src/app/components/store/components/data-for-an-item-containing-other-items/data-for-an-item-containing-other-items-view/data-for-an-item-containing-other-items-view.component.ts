
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataForAnItemContainingOtherItems } from 'app/shared/models/data-for-an-item-containing-other-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataForAnItemContainingOtherItemsService } from '../shared/data-for-an-item-containing-other-items.service';

@Component({
  selector: 'app-data-for-an-item-containing-other-items-view',
  templateUrl: './data-for-an-item-containing-other-items-view.component.html',
  styleUrls: ['./data-for-an-item-containing-other-items-view.component.scss'],
  providers: []
})

export class DataForAnItemContainingOtherItemsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataForAnItemContainingOtherItems: DataForAnItemContainingOtherItems;
  dataForAnItemContainingOtherItemsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataForAnItemContainingOtherItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataForAnItemContainingOtherItemsViewComponent>,
    public dataForAnItemContainingOtherItemsService: DataForAnItemContainingOtherItemsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataForAnItemContainingOtherItems = this.selectedDataForAnItemContainingOtherItemsDialog.data || this.selectedDataForAnItemContainingOtherItems;

    

    this.dataForAnItemContainingOtherItemsForm = this.formBuilder.group({
      
  itemNumber : [this.selectedDataForAnItemContainingOtherItems.itemNumber],
  basicItemNumber : [this.selectedDataForAnItemContainingOtherItems.basicItemNumber],
  quantity : [this.selectedDataForAnItemContainingOtherItems.quantity]
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
    return this.dataForAnItemContainingOtherItemsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataForAnItemContainingOtherItemsForm.controls)) {
      this.dataForAnItemContainingOtherItemsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

