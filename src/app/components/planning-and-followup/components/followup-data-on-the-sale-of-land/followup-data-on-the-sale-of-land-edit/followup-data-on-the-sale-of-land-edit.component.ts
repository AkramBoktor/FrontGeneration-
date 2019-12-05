
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupDataOnTheSaleOfLand } from 'app/shared/models/followup-data-on-the-sale-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FollowupDataOnTheSaleOfLandService } from '../shared/followup-data-on-the-sale-of-land.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-followup-data-on-the-sale-of-land-edit',
  templateUrl: './followup-data-on-the-sale-of-land-edit.component.html',
  styleUrls: ['./followup-data-on-the-sale-of-land-edit.component.scss'],
  providers: []
})

export class FollowupDataOnTheSaleOfLandEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupDataOnTheSaleOfLand: FollowupDataOnTheSaleOfLand;
  followupDataOnTheSaleOfLandForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupDataOnTheSaleOfLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupDataOnTheSaleOfLandEditComponent>,
    public followupDataOnTheSaleOfLandService: FollowupDataOnTheSaleOfLandService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupDataOnTheSaleOfLand = new FollowupDataOnTheSaleOfLand();
    this.selectedFollowupDataOnTheSaleOfLand = this.selectedFollowupDataOnTheSaleOfLandDialog.data || this.selectedFollowupDataOnTheSaleOfLand;

    

    this.followupDataOnTheSaleOfLandForm = this.formBuilder.group({
      
  id : [this.selectedFollowupDataOnTheSaleOfLand.id],
  landNumber : [this.selectedFollowupDataOnTheSaleOfLand.landNumber, [ Validators.required ]],
  department : [this.selectedFollowupDataOnTheSaleOfLand.department, [ Validators.required ]],
  village : [this.selectedFollowupDataOnTheSaleOfLand.village, [ Validators.required ]],
  totalArea : [this.selectedFollowupDataOnTheSaleOfLand.totalArea, [ Validators.required ]],
  currentOwner : [this.selectedFollowupDataOnTheSaleOfLand.currentOwner, [ Validators.required ]],
  stage : [this.selectedFollowupDataOnTheSaleOfLand.stage, [ Validators.required ]],
  sample : [this.selectedFollowupDataOnTheSaleOfLand.sample, [ Validators.required ]],
  accreditation : [this.selectedFollowupDataOnTheSaleOfLand.accreditation, [ Validators.required ]],
  documents : [this.selectedFollowupDataOnTheSaleOfLand.documents, [ Validators.required ]],
  soothing : [this.selectedFollowupDataOnTheSaleOfLand.soothing, [ Validators.required ]],
  plan : [this.selectedFollowupDataOnTheSaleOfLand.plan, [ Validators.required ]],
  negotiationEntity : [this.selectedFollowupDataOnTheSaleOfLand.negotiationEntity, [ Validators.required ]],
  saleNegotiations : [this.selectedFollowupDataOnTheSaleOfLand.saleNegotiations, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.followupDataOnTheSaleOfLandService.update(this.followupDataOnTheSaleOfLandForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.followupDataOnTheSaleOfLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.followupDataOnTheSaleOfLandForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
