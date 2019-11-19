
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AnnualPlan } from 'app/shared/models/annual-plan';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AnnualPlanService } from '../shared/annual-plan.service';




@Component({
  selector: 'app-annual-plan-edit',
  templateUrl: './annual-plan-edit.component.html',
  styleUrls: ['./annual-plan-edit.component.scss'],
  providers: []
})

export class AnnualPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnnualPlan: AnnualPlan;
  annualPlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private circuitCodesService: LookupService;
private sessionDestinationCodesService: LookupService;
private sessionSerialsService: LookupService;
private areasService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseCodeSelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
serialSessionSelectOptions: MaterialSelectOptions;
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;
	@ViewChild('courseCode', { static: true }) CourseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('courseDestinationCode', { static: true }) CourseDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('serialSession', { static: true }) SerialSessionSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnnualPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<AnnualPlanEditComponent>,
    public annualPlanService: AnnualPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan = new AnnualPlan();
    this.selectedAnnualPlan = this.selectedAnnualPlanDialog.data || this.selectedAnnualPlan;

    
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

	this.courseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الدوره',
	});

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.serialSessionSelectOptions = new MaterialSelectOptions({
	 data: this.sessionSerialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مسلسل الدوره',
	});

	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره او المنطقه',
	});


    this.annualPlanForm = this.formBuilder.group({
      
  id : [this.selectedAnnualPlan.id],
  trainingYear : [this.selectedAnnualPlan.trainingYear, [ Validators.required ]],
  candidatesNumber : [this.selectedAnnualPlan.candidatesNumber, [ Validators.required ]],
  majorClassification : [this.selectedAnnualPlan.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedAnnualPlan.subcategory, [ Validators.required ]],
  courseCode : [this.selectedAnnualPlan.courseCode, [ Validators.required ]],
  courseDestinationCode : [this.selectedAnnualPlan.courseDestinationCode, [ Validators.required ]],
  serialSession : [this.selectedAnnualPlan.serialSession, [ Validators.required ]],
  administrationOrRegion : [this.selectedAnnualPlan.administrationOrRegion, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.annualPlanService.update(this.annualPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.annualPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.annualPlanForm.get(name);
  }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.sessionSerialsService = new LookupService('sessionserials', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
