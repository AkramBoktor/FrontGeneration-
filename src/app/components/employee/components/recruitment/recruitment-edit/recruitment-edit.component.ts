
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Recruitment } from 'app/shared/models/recruitment';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { RecruitmentService } from '../shared/recruitment.service';




@Component({
  selector: 'app-recruitment-edit',
  templateUrl: './recruitment-edit.component.html',
  styleUrls: ['./recruitment-edit.component.scss'],
  providers: []
})

export class RecruitmentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecruitment: Recruitment;
  recruitmentForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private positionRecruitmentsService: LookupService;

  
positionRecruitmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('positionRecruitment', { static: true }) PositionRecruitmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecruitmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecruitmentEditComponent>,
    public recruitmentService: RecruitmentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecruitment = new Recruitment();
    this.selectedRecruitment = this.selectedRecruitmentDialog.data || this.selectedRecruitment;

    
	this.positionRecruitmentSelectOptions = new MaterialSelectOptions({
	 data: this.positionRecruitmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف التجنيد',
	});


    this.recruitmentForm = this.formBuilder.group({
      
  id : [this.selectedRecruitment.id],
  serviceCertificateDate : [this.selectedRecruitment.serviceCertificateDate, [ Validators.required ]],
  temporaryExemptionDate : [this.selectedRecruitment.temporaryExemptionDate, [ Validators.required ]],
  callbackReserveDate : [this.selectedRecruitment.callbackReserveDate, [ Validators.required ]],
  reserveReturnDate : [this.selectedRecruitment.reserveReturnDate, [ Validators.required ]],
  reserveEndDate : [this.selectedRecruitment.reserveEndDate, [ Validators.required ]],
  entryArmyDate : [this.selectedRecruitment.entryArmyDate, [ ]],
  departureArmyDate : [this.selectedRecruitment.departureArmyDate, [ Validators.required ]],
  employeeCode : [this.selectedRecruitment.employeeCode, [ Validators.required ]],
  positionRecruitment : [this.selectedRecruitment.positionRecruitment, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recruitmentService.update(this.recruitmentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recruitmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recruitmentForm.get(name);
  }

  initializeLookupServices() {
    this.positionRecruitmentsService = new LookupService('positionrecruitments', this.http);
  }
}
