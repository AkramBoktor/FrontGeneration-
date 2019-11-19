
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitSessionsArbitration } from 'app/shared/models/lawsuit-sessions-arbitration';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { LawsuitSessionsArbitrationService } from '../shared/lawsuit-sessions-arbitration.service';




@Component({
  selector: 'app-lawsuit-sessions-arbitration-edit',
  templateUrl: './lawsuit-sessions-arbitration-edit.component.html',
  styleUrls: ['./lawsuit-sessions-arbitration-edit.component.scss'],
  providers: []
})

export class LawsuitSessionsArbitrationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLawsuitSessionsArbitration: LawsuitSessionsArbitration;
  lawsuitSessionsArbitrationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private courtCodesService: LookupService;
private bodyAttributesService: LookupService;
private arbitrationClassificationsService: LookupService;
private discountTypesService: LookupService;
private discountCodesService: LookupService;
private arbitrationTopicCodesService: LookupService;
private arbitratorsService: LookupService;
private technicalMembersService: LookupService;
private legalMemberService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
arbitrationCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
arbitrationClassificationSelectOptions: MaterialSelectOptions;
discountTypeSelectOptions: MaterialSelectOptions;
codeSelectOptions: MaterialSelectOptions;
arbitrationTextSelectOptions: MaterialSelectOptions;
arbitratorSelectOptions: MaterialSelectOptions;
technicalMemberSelectOptions: MaterialSelectOptions;
legalMemberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationCode', { static: true }) ArbitrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationClassification', { static: true }) ArbitrationClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('discountType', { static: true }) DiscountTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('code', { static: true }) CodeSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationText', { static: true }) ArbitrationTextSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrator', { static: true }) ArbitratorSelectComponent: MaterialSelectComponent;
	@ViewChild('technicalMember', { static: true }) TechnicalMemberSelectComponent: MaterialSelectComponent;
	@ViewChild('legalMember', { static: true }) LegalMemberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLawsuitSessionsArbitrationDialog: any,
    @Optional() public dialogRef: MatDialogRef<LawsuitSessionsArbitrationEditComponent>,
    public lawsuitSessionsArbitrationService: LawsuitSessionsArbitrationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLawsuitSessionsArbitration = new LawsuitSessionsArbitration();
    this.selectedLawsuitSessionsArbitration = this.selectedLawsuitSessionsArbitrationDialog.data || this.selectedLawsuitSessionsArbitration;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.arbitrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التحكيم',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.arbitrationClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف التحكيم',
	});

	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});

	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.discountCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الخصم',
	});

	this.arbitrationTextSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationTopicCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موضوع التحكيم',
	});

	this.arbitratorSelectOptions = new MaterialSelectOptions({
	 data: this.arbitratorsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحكم',
	});

	this.technicalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.technicalMembersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو الفني',
	});

	this.legalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.legalMemberService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو القانوني',
	});


    this.lawsuitSessionsArbitrationForm = this.formBuilder.group({
      
  id : [this.selectedLawsuitSessionsArbitration.id],
  fileNumber : [this.selectedLawsuitSessionsArbitration.fileNumber, [ Validators.required ]],
  arbitrationNumber : [this.selectedLawsuitSessionsArbitration.arbitrationNumber, [ ]],
  year : [this.selectedLawsuitSessionsArbitration.year, [ ]],
  sessionDate : [this.selectedLawsuitSessionsArbitration.sessionDate, [ Validators.required ]],
  branchCode : [this.selectedLawsuitSessionsArbitration.branchCode, [ ]],
  entityType : [this.selectedLawsuitSessionsArbitration.entityType, [ ]],
  arbitrationCode : [this.selectedLawsuitSessionsArbitration.arbitrationCode, [ ]],
  whoIs : [this.selectedLawsuitSessionsArbitration.whoIs, [ ]],
  arbitrationClassification : [this.selectedLawsuitSessionsArbitration.arbitrationClassification, [ Validators.required ]],
  discountType : [this.selectedLawsuitSessionsArbitration.discountType, [ Validators.required ]],
  code : [this.selectedLawsuitSessionsArbitration.code, [ Validators.required ]],
  arbitrationText : [this.selectedLawsuitSessionsArbitration.arbitrationText, [ Validators.required ]],
  arbitrator : [this.selectedLawsuitSessionsArbitration.arbitrator, [ Validators.required ]],
  technicalMember : [this.selectedLawsuitSessionsArbitration.technicalMember, [ Validators.required ]],
  legalMember : [this.selectedLawsuitSessionsArbitration.legalMember, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.lawsuitSessionsArbitrationService.update(this.lawsuitSessionsArbitrationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.lawsuitSessionsArbitrationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.lawsuitSessionsArbitrationForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.arbitrationClassificationsService = new LookupService('arbitrationclassifications', this.http);
this.discountTypesService = new LookupService('discounttypes', this.http);
this.discountCodesService = new LookupService('discountcodes', this.http);
this.arbitrationTopicCodesService = new LookupService('arbitrationtopiccodes', this.http);
this.arbitratorsService = new LookupService('arbitrators', this.http);
this.technicalMembersService = new LookupService('technicalmembers', this.http);
this.legalMemberService = new LookupService('legalmembers', this.http);
  }
}
