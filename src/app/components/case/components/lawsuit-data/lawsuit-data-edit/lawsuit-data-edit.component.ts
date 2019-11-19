
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitData } from 'app/shared/models/lawsuit-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { LawsuitDataService } from '../shared/lawsuit-data.service';




@Component({
  selector: 'app-lawsuit-data-edit',
  templateUrl: './lawsuit-data-edit.component.html',
  styleUrls: ['./lawsuit-data-edit.component.scss'],
  providers: []
})

export class LawsuitDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLawsuitData: LawsuitData;
  lawsuitDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private litigationDegreesService: LookupService;
private circuitCodesService: LookupService;
private courtCodesService: LookupService;
private issueCodeIssuesService: LookupService;
private advocacyPositionsService: LookupService;
private bodyAttributesService: LookupService;
private entityCodesService: LookupService;
private entityTypeService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
litigationDegreeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
lawsuitPositionSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('litigationDegree', { static: true }) LitigationDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('courtCode', { static: true }) CourtCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('lawsuitPosition', { static: true }) LawsuitPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLawsuitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LawsuitDataEditComponent>,
    public lawsuitDataService: LawsuitDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLawsuitData = new LawsuitData();
    this.selectedLawsuitData = this.selectedLawsuitDataDialog.data || this.selectedLawsuitData;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.litigationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.litigationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التقاضي',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائره',
	});

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة',
	});

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.lawsuitPositionSelectOptions = new MaterialSelectOptions({
	 data: this.advocacyPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الدعوي',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});


    this.lawsuitDataForm = this.formBuilder.group({
      
  id : [this.selectedLawsuitData.id],
  lawyerReceiptDate : [this.selectedLawsuitData.lawyerReceiptDate, [ Validators.required ]],
  employeeCode : [this.selectedLawsuitData.employeeCode, [ Validators.required ]],
  incomingDate : [this.selectedLawsuitData.incomingDate, [ Validators.required ]],
  year : [this.selectedLawsuitData.year, [ Validators.required ]],
  fileNumber : [this.selectedLawsuitData.fileNumber, [ Validators.required ]],
  lawsuitNumber : [this.selectedLawsuitData.lawsuitNumber, [ Validators.required ]],
  firstSessionDate : [this.selectedLawsuitData.firstSessionDate, [ Validators.required ]],
  branchCode : [this.selectedLawsuitData.branchCode, [ Validators.required ]],
  litigationDegree : [this.selectedLawsuitData.litigationDegree, [ Validators.required ]],
  chamberType : [this.selectedLawsuitData.chamberType, [ Validators.required ]],
  courtCode : [this.selectedLawsuitData.courtCode, [ Validators.required ]],
  issueCode : [this.selectedLawsuitData.issueCode, [ Validators.required ]],
  lawsuitPosition : [this.selectedLawsuitData.lawsuitPosition, [ Validators.required ]],
  whoIs : [this.selectedLawsuitData.whoIs, [ Validators.required ]],
  entityCode : [this.selectedLawsuitData.entityCode, [ Validators.required ]],
  entityType : [this.selectedLawsuitData.entityType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.lawsuitDataService.update(this.lawsuitDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.lawsuitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.lawsuitDataForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.litigationDegreesService = new LookupService('litigationdegrees', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.advocacyPositionsService = new LookupService('advocacypositions', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
  }
}
