
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OralInvestigations } from 'app/shared/models/oral-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { OralInvestigationsService } from '../shared/oral-investigations.service';


@Component({
  selector: 'app-oral-investigations-new',
  templateUrl: './oral-investigations-new.component.html',
  styleUrls: ['./oral-investigations-new.component.scss'],
  providers: [
    ]
})

export class OralInvestigationsNewComponent extends AppBaseComponent implements OnInit {
  oralInvestigationsForm: FormGroup;
  @Input() selectedOralInvestigations: OralInvestigations;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private violationsService: LookupService;
private penaltiesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
punishmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('violationCode', { static: true }) ViolationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('punishment', { static: true }) PunishmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<OralInvestigationsNewComponent>,
    public oralInvestigationsService: OralInvestigationsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOralInvestigations = new OralInvestigations();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.punishmentSelectOptions = new MaterialSelectOptions({
	 data: this.penaltiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العقوبة',
	});


    this.oralInvestigationsForm = this.formBuilder.group({
     
  id : [0],
  investigationFileNumber : [this.selectedOralInvestigations.investigationFileNumber, [ Validators.required ]],
  lawyerPenaltyCode : [this.selectedOralInvestigations.lawyerPenaltyCode, [ Validators.required ]],
  punishmentDate : [this.selectedOralInvestigations.punishmentDate, [ Validators.required ]],
  executiveOrderNumber : [this.selectedOralInvestigations.executiveOrderNumber, [ Validators.required ]],
  issuanceExecutiveOrderDate : [this.selectedOralInvestigations.issuanceExecutiveOrderDate, [ Validators.required ]],
  employeeCode : [this.selectedOralInvestigations.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedOralInvestigations.employeeName, [ ]],
  branchCode : [this.selectedOralInvestigations.branchCode, [ Validators.required ]],
  violationCode : [this.selectedOralInvestigations.violationCode, [ Validators.required ]],
  punishment : [this.selectedOralInvestigations.punishment, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.oralInvestigationsService.create(this.oralInvestigationsForm.value)
        .pipe(switchMap(x => {
			return this.oralInvestigationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.oralInvestigationsForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.violationsService = new LookupService('violations', this.http);
this.penaltiesService = new LookupService('penalties', this.http);
  }
 }
