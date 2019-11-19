
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Recruitment } from 'app/shared/models/recruitment';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { RecruitmentService } from '../shared/recruitment.service';


@Component({
  selector: 'app-recruitment-new',
  templateUrl: './recruitment-new.component.html',
  styleUrls: ['./recruitment-new.component.scss'],
  providers: [
    ]
})

export class RecruitmentNewComponent extends AppBaseComponent implements OnInit {
  recruitmentForm: FormGroup;
  @Input() selectedRecruitment: Recruitment;
  errorMessages: FormControlError[] = [
        
  ];

  private positionRecruitmentsService: LookupService;

  
positionRecruitmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('positionRecruitment', { static: true }) PositionRecruitmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecruitmentNewComponent>,
    public recruitmentService: RecruitmentService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecruitment = new Recruitment();

    
	this.positionRecruitmentSelectOptions = new MaterialSelectOptions({
	 data: this.positionRecruitmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف التجنيد',
	});


    this.recruitmentForm = this.formBuilder.group({
     
  id : [0],
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
    this.recruitmentService.create(this.recruitmentForm.value)
        .pipe(switchMap(x => {
			return this.recruitmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recruitmentForm.get(name);
    }

  initializeLookupServices() {
    this.positionRecruitmentsService = new LookupService('positionrecruitments', this.http);
  }
 }
