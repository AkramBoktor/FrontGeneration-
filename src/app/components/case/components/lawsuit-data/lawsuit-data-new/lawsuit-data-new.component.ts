
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitData } from 'app/shared/models/lawsuit-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { LawsuitDataService } from '../shared/lawsuit-data.service';


@Component({
  selector: 'app-lawsuit-data-new',
  templateUrl: './lawsuit-data-new.component.html',
  styleUrls: ['./lawsuit-data-new.component.scss'],
  providers: [
    ]
})

export class LawsuitDataNewComponent extends AppBaseComponent implements OnInit {
  lawsuitDataForm: FormGroup;
  @Input() selectedLawsuitData: LawsuitData;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private bodyAttributesService: LookupService;
private advocacyPositionsService: LookupService;
private issueCodeIssuesService: LookupService;
private courtCodesService: LookupService;
private circuitCodesService: LookupService;
private litigationDegreesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
lawsuitPositionSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;
litigationDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('lawsuitPosition', { static: true }) LawsuitPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('courtCode', { static: true }) CourtCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('litigationDegree', { static: true }) LitigationDegreeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LawsuitDataNewComponent>,
    public lawsuitDataService: LawsuitDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLawsuitData = new LawsuitData();

    
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

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.lawsuitPositionSelectOptions = new MaterialSelectOptions({
	 data: this.advocacyPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الدعوي',
	});

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائره',
	});

	this.litigationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.litigationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التقاضي',
	});


    this.lawsuitDataForm = this.formBuilder.group({
     
  id : [0],
  fileNumber : [this.selectedLawsuitData.fileNumber, [ Validators.required ]],
  lawsuitNumber : [this.selectedLawsuitData.lawsuitNumber, [ Validators.required ]],
  year : [this.selectedLawsuitData.year, [ Validators.required ]],
  employeeCode : [this.selectedLawsuitData.employeeCode, [ Validators.required ]],
  lawyerReceiptDate : [this.selectedLawsuitData.lawyerReceiptDate, [ Validators.required ]],
  incomingDate : [this.selectedLawsuitData.incomingDate, [ Validators.required ]],
  firstSessionDate : [this.selectedLawsuitData.firstSessionDate, [ Validators.required ]],
  branchCode : [this.selectedLawsuitData.branchCode, [ Validators.required ]],
  entityType : [this.selectedLawsuitData.entityType, [ Validators.required ]],
  entityCode : [this.selectedLawsuitData.entityCode, [ Validators.required ]],
  whoIs : [this.selectedLawsuitData.whoIs, [ Validators.required ]],
  lawsuitPosition : [this.selectedLawsuitData.lawsuitPosition, [ Validators.required ]],
  issueCode : [this.selectedLawsuitData.issueCode, [ Validators.required ]],
  courtCode : [this.selectedLawsuitData.courtCode, [ Validators.required ]],
  chamberType : [this.selectedLawsuitData.chamberType, [ Validators.required ]],
  litigationDegree : [this.selectedLawsuitData.litigationDegree, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.lawsuitDataService.create(this.lawsuitDataForm.value)
        .pipe(switchMap(x => {
			return this.lawsuitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.lawsuitDataForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.advocacyPositionsService = new LookupService('advocacypositions', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
this.litigationDegreesService = new LookupService('litigationdegrees', this.http);
  }
 }
