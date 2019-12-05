
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Reward } from 'app/shared/models/reward';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RewardService } from '../shared/reward.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reward-edit',
  templateUrl: './reward-edit.component.html',
  styleUrls: ['./reward-edit.component.scss'],
  providers: []
})

export class RewardEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReward: Reward;
  rewardForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private departmentsSectionsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRewardDialog: any,
    @Optional() public dialogRef: MatDialogRef<RewardEditComponent>,
    public rewardService: RewardService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReward = new Reward();
    this.selectedReward = this.selectedRewardDialog.data || this.selectedReward;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.rewardForm = this.formBuilder.group({
      
  id : [this.selectedReward.id],
  bonusCode : [this.selectedReward.bonusCode, [ Validators.required ]],
  incomingNumber : [this.selectedReward.incomingNumber, [ Validators.required ]],
  incomingYearAndMonth : [this.selectedReward.incomingYearAndMonth, [ Validators.required ]],
  netValue : [this.selectedReward.netValue, [ Validators.required ]],
  writeOffNumber : [this.selectedReward.writeOffNumber, [ Validators.required ]],
  atualDate : [this.selectedReward.atualDate, [ Validators.required ]],
  releaseDate : [this.selectedReward.releaseDate, [ Validators.required ]],
  delistingDate : [this.selectedReward.delistingDate, [ Validators.required ]],
  administrationCode : [this.selectedReward.administrationCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.rewardService.update(this.rewardForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.rewardService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.rewardForm.get(name);
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}
