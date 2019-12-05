
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TotalOutgoing } from 'app/shared/models/total-outgoing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TotalOutgoingService } from '../shared/total-outgoing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-total-outgoing-view',
  templateUrl: './total-outgoing-view.component.html',
  styleUrls: ['./total-outgoing-view.component.scss'],
  providers: []
})

export class TotalOutgoingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTotalOutgoing: TotalOutgoing;
  totalOutgoingForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTotalOutgoingDialog: any,
    @Optional() public dialogRef: MatDialogRef<TotalOutgoingViewComponent>,
    public totalOutgoingService: TotalOutgoingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalOutgoing = this.selectedTotalOutgoingDialog.data || this.selectedTotalOutgoing;

    

    this.totalOutgoingForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedTotalOutgoing.schoolNumber],
  schoolName : [this.selectedTotalOutgoing.schoolName],
  contractor : [this.selectedTotalOutgoing.contractor],
  contractorNmae : [this.selectedTotalOutgoing.contractorNmae],
  bidNumber : [this.selectedTotalOutgoing.bidNumber],
  totalOutgoing : [this.selectedTotalOutgoing.totalOutgoing]
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
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.totalOutgoingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.totalOutgoingForm.controls)) {
      this.totalOutgoingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

