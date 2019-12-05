
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FollowupDataOnTheSaleOfLand } from 'app/shared/models/followup-data-on-the-sale-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowupDataOnTheSaleOfLandService } from '../shared/followup-data-on-the-sale-of-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-followup-data-on-the-sale-of-land-view',
  templateUrl: './followup-data-on-the-sale-of-land-view.component.html',
  styleUrls: ['./followup-data-on-the-sale-of-land-view.component.scss'],
  providers: []
})

export class FollowupDataOnTheSaleOfLandViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupDataOnTheSaleOfLand: FollowupDataOnTheSaleOfLand;
  followupDataOnTheSaleOfLandForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupDataOnTheSaleOfLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupDataOnTheSaleOfLandViewComponent>,
    public followupDataOnTheSaleOfLandService: FollowupDataOnTheSaleOfLandService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupDataOnTheSaleOfLand = this.selectedFollowupDataOnTheSaleOfLandDialog.data || this.selectedFollowupDataOnTheSaleOfLand;

    

    this.followupDataOnTheSaleOfLandForm = this.formBuilder.group({
      
  landNumber : [this.selectedFollowupDataOnTheSaleOfLand.landNumber],
  department : [this.selectedFollowupDataOnTheSaleOfLand.department],
  village : [this.selectedFollowupDataOnTheSaleOfLand.village],
  totalArea : [this.selectedFollowupDataOnTheSaleOfLand.totalArea],
  currentOwner : [this.selectedFollowupDataOnTheSaleOfLand.currentOwner],
  stage : [this.selectedFollowupDataOnTheSaleOfLand.stage],
  sample : [this.selectedFollowupDataOnTheSaleOfLand.sample],
  accreditation : [this.selectedFollowupDataOnTheSaleOfLand.accreditation],
  documents : [this.selectedFollowupDataOnTheSaleOfLand.documents],
  soothing : [this.selectedFollowupDataOnTheSaleOfLand.soothing],
  plan : [this.selectedFollowupDataOnTheSaleOfLand.plan],
  negotiationEntity : [this.selectedFollowupDataOnTheSaleOfLand.negotiationEntity],
  saleNegotiations : [this.selectedFollowupDataOnTheSaleOfLand.saleNegotiations]
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
    return this.followupDataOnTheSaleOfLandForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.followupDataOnTheSaleOfLandForm.controls)) {
      this.followupDataOnTheSaleOfLandForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

