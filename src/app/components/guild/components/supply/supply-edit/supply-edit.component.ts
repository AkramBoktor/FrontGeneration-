
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Supply } from 'app/shared/models/supply';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SupplyService } from '../shared/supply.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-supply-edit',
  templateUrl: './supply-edit.component.html',
  styleUrls: ['./supply-edit.component.scss'],
  providers: []
})

export class SupplyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSupply: Supply;
  supplyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSupplyDialog: any,
    @Optional() public dialogRef: MatDialogRef<SupplyEditComponent>,
    public supplyService: SupplyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupply = new Supply();
    this.selectedSupply = this.selectedSupplyDialog.data || this.selectedSupply;

    

    this.supplyForm = this.formBuilder.group({
      
  id : [this.selectedSupply.id],
  valueNumber : [this.selectedSupply.valueNumber, [ Validators.required ]],
  valueDate : [this.selectedSupply.valueDate, [ Validators.required ]],
  valueAmount : [this.selectedSupply.valueAmount, [ Validators.required ]],
  from : [this.selectedSupply.from, [ Validators.required ]],
  to : [this.selectedSupply.to, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.supplyService.update(this.supplyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.supplyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.supplyForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
