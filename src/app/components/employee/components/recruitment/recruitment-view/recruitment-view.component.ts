
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Recruitment } from 'app/shared/models/recruitment';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecruitmentService } from '../shared/recruitment.service';

@Component({
  selector: 'app-recruitment-view',
  templateUrl: './recruitment-view.component.html',
  styleUrls: ['./recruitment-view.component.scss'],
  providers: []
})

export class RecruitmentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecruitment: Recruitment;
  recruitmentForm: FormGroup;

  private positionRecruitmentsService: LookupService;

  
positionRecruitmentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecruitmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecruitmentViewComponent>,
    public recruitmentService: RecruitmentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecruitment = this.selectedRecruitmentDialog.data || this.selectedRecruitment;

    
	this.positionRecruitmentSelectOptions = new MaterialSelectOptions({
	 data: this.positionRecruitmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف التجنيد',
	});


    this.recruitmentForm = this.formBuilder.group({
      
  serviceCertificateDate : [this.selectedRecruitment.serviceCertificateDate],
  temporaryExemptionDate : [this.selectedRecruitment.temporaryExemptionDate],
  callbackReserveDate : [this.selectedRecruitment.callbackReserveDate],
  reserveReturnDate : [this.selectedRecruitment.reserveReturnDate],
  reserveEndDate : [this.selectedRecruitment.reserveEndDate],
  entryArmyDate : [this.selectedRecruitment.entryArmyDate],
  departureArmyDate : [this.selectedRecruitment.departureArmyDate],
  employeeCode : [this.selectedRecruitment.employeeCode],
  positionRecruitment : [this.selectedRecruitment.positionRecruitment]
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
    return this.recruitmentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recruitmentForm.controls)) {
      this.recruitmentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.positionRecruitmentsService = new LookupService('positionrecruitments', this.http);
  }
}

