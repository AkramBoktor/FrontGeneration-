
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FollowupDataOnTheSaleOfLand } from 'app/shared/models/followup-data-on-the-sale-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowupDataOnTheSaleOfLandService } from '../shared/followup-data-on-the-sale-of-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-followup-data-on-the-sale-of-land-new',
  templateUrl: './followup-data-on-the-sale-of-land-new.component.html',
  styleUrls: ['./followup-data-on-the-sale-of-land-new.component.scss'],
  providers: [
    ]
})

export class FollowupDataOnTheSaleOfLandNewComponent extends AppBaseComponent implements OnInit {
  followupDataOnTheSaleOfLandForm: FormGroup;
  @Input() selectedFollowupDataOnTheSaleOfLand: FollowupDataOnTheSaleOfLand;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FollowupDataOnTheSaleOfLandNewComponent>,
    public followupDataOnTheSaleOfLandService: FollowupDataOnTheSaleOfLandService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupDataOnTheSaleOfLand = new FollowupDataOnTheSaleOfLand();

    

    this.followupDataOnTheSaleOfLandForm = this.formBuilder.group({
     
  id : [0],
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
    this.followupDataOnTheSaleOfLandService.create(this.followupDataOnTheSaleOfLandForm.value)
        .pipe(switchMap(x => {
			return this.followupDataOnTheSaleOfLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.followupDataOnTheSaleOfLandForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
