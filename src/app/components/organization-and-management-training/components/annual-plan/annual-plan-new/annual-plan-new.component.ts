
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AnnualPlan } from 'app/shared/models/annual-plan';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AnnualPlanService } from '../shared/annual-plan.service';


@Component({
  selector: 'app-annual-plan-new',
  templateUrl: './annual-plan-new.component.html',
  styleUrls: ['./annual-plan-new.component.scss'],
  providers: [
    ]
})

export class AnnualPlanNewComponent extends AppBaseComponent implements OnInit {
  annualPlanForm: FormGroup;
  @Input() selectedAnnualPlan: AnnualPlan;
  errorMessages: FormControlError[] = [
        
  ];

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private sessionDestinationCodesService: LookupService;
private areasService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;
	@ViewChild('courseDestinationCode', { static: true }) CourseDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AnnualPlanNewComponent>,
    public annualPlanService: AnnualPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan = new AnnualPlan();

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره او المنطقه',
	});


    this.annualPlanForm = this.formBuilder.group({
     
  id : [0],
  trainingYear : [this.selectedAnnualPlan.trainingYear, [ Validators.required ]],
  courseCode : [this.selectedAnnualPlan.courseCode, [ Validators.required ]],
  serialSession : [this.selectedAnnualPlan.serialSession, [ Validators.required ]],
  candidatesNumber : [this.selectedAnnualPlan.candidatesNumber, [ Validators.required ]],
  majorClassification : [this.selectedAnnualPlan.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedAnnualPlan.subcategory, [ Validators.required ]],
  courseDestinationCode : [this.selectedAnnualPlan.courseDestinationCode, [ Validators.required ]],
  administrationOrRegion : [this.selectedAnnualPlan.administrationOrRegion, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.annualPlanService.create(this.annualPlanForm.value)
        .pipe(switchMap(x => {
			return this.annualPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.annualPlanForm.get(name);
    }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
