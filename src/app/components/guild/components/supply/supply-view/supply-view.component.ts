
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Supply } from 'app/shared/models/supply';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SupplyService } from '../shared/supply.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-supply-view',
  templateUrl: './supply-view.component.html',
  styleUrls: ['./supply-view.component.scss'],
  providers: []
})

export class SupplyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSupply: Supply;
  supplyForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSupplyDialog: any,
    @Optional() public dialogRef: MatDialogRef<SupplyViewComponent>,
    public supplyService: SupplyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupply = this.selectedSupplyDialog.data || this.selectedSupply;

    

    this.supplyForm = this.formBuilder.group({
      
  valueNumber : [this.selectedSupply.valueNumber],
  valueDate : [this.selectedSupply.valueDate],
  valueAmount : [this.selectedSupply.valueAmount],
  from : [this.selectedSupply.from],
  to : [this.selectedSupply.to]
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
    return this.supplyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.supplyForm.controls)) {
      this.supplyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

