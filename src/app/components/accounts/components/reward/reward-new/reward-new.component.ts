
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Reward } from 'app/shared/models/reward';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RewardService } from '../shared/reward.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reward-new',
  templateUrl: './reward-new.component.html',
  styleUrls: ['./reward-new.component.scss'],
  providers: [
    ]
})

export class RewardNewComponent extends AppBaseComponent implements OnInit {
  rewardForm: FormGroup;
  @Input() selectedReward: Reward;
  errorMessages: FormControlError[] = [
        
  ];

  private departmentsSectionsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RewardNewComponent>,
    public rewardService: RewardService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReward = new Reward();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.rewardForm = this.formBuilder.group({
     
  id : [0],
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
    this.rewardService.create(this.rewardForm.value)
        .pipe(switchMap(x => {
			return this.rewardService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.rewardForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
 }
