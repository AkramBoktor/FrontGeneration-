
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ThePlannedStartDateForTheSchedule } from 'app/shared/models/the-planned-start-date-for-the-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThePlannedStartDateForTheScheduleService } from '../shared/the-planned-start-date-for-the-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-planned-start-date-for-the-schedule-new',
  templateUrl: './the-planned-start-date-for-the-schedule-new.component.html',
  styleUrls: ['./the-planned-start-date-for-the-schedule-new.component.scss'],
  providers: [
    ]
})

export class ThePlannedStartDateForTheScheduleNewComponent extends AppBaseComponent implements OnInit {
  thePlannedStartDateForTheScheduleForm: FormGroup;
  @Input() selectedThePlannedStartDateForTheSchedule: ThePlannedStartDateForTheSchedule;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private governoratesService: LookupService;

  
subtractionTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subtractionType', { static: true }) SubtractionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  
tenderCodeIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ThePlannedStartDateForTheScheduleNewComponent>,
    public thePlannedStartDateForTheScheduleService: ThePlannedStartDateForTheScheduleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePlannedStartDateForTheSchedule = new ThePlannedStartDateForTheSchedule();

    
	this.subtractionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.thePlannedStartDateForTheScheduleForm = this.formBuilder.group({
     
  id : [0],
  buildingNumberEducational : [this.selectedThePlannedStartDateForTheSchedule.buildingNumberEducational, [ Validators.required ]],
  tenderCode : [this.selectedThePlannedStartDateForTheSchedule.tenderCode, [ ]],
  yearPlan : [this.selectedThePlannedStartDateForTheSchedule.yearPlan, [ ]],
  serialSupplement : [this.selectedThePlannedStartDateForTheSchedule.serialSupplement, [ ]],
  typeOFStartDateForChart : [this.selectedThePlannedStartDateForTheSchedule.typeOFStartDateForChart, [ Validators.required ]],
  startDateForChart : [this.selectedThePlannedStartDateForTheSchedule.startDateForChart, [ Validators.required ]],
  notes : [this.selectedThePlannedStartDateForTheSchedule.notes, [ ]],
  subtractionType : [this.selectedThePlannedStartDateForTheSchedule.subtractionType, [ ]],
  constructionType : [this.selectedThePlannedStartDateForTheSchedule.constructionType, [ ]],
  governorateCode : [this.selectedThePlannedStartDateForTheSchedule.governorateCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.thePlannedStartDateForTheScheduleService.create(this.thePlannedStartDateForTheScheduleForm.value)
        .pipe(switchMap(x => {
			return this.thePlannedStartDateForTheScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.thePlannedStartDateForTheScheduleForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
 }
