
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Reward } from 'app/shared/models/reward';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RewardService } from '../shared/reward.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-reward-view',
  templateUrl: './reward-view.component.html',
  styleUrls: ['./reward-view.component.scss'],
  providers: []
})

export class RewardViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReward: Reward;
  rewardForm: FormGroup;

  private departmentsSectionsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRewardDialog: any,
    @Optional() public dialogRef: MatDialogRef<RewardViewComponent>,
    public rewardService: RewardService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReward = this.selectedRewardDialog.data || this.selectedReward;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.rewardForm = this.formBuilder.group({
      
  bonusCode : [this.selectedReward.bonusCode],
  incomingNumber : [this.selectedReward.incomingNumber],
  incomingYearAndMonth : [this.selectedReward.incomingYearAndMonth],
  netValue : [this.selectedReward.netValue],
  writeOffNumber : [this.selectedReward.writeOffNumber],
  atualDate : [this.selectedReward.atualDate],
  releaseDate : [this.selectedReward.releaseDate],
  delistingDate : [this.selectedReward.delistingDate],
  administrationCode : [this.selectedReward.administrationCode]
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
    return this.rewardForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.rewardForm.controls)) {
      this.rewardForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

