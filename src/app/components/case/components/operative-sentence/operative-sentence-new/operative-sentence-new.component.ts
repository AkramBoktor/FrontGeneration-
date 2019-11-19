
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OperativeSentence } from 'app/shared/models/operative-sentence';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { OperativeSentenceService } from '../shared/operative-sentence.service';


@Component({
  selector: 'app-operative-sentence-new',
  templateUrl: './operative-sentence-new.component.html',
  styleUrls: ['./operative-sentence-new.component.scss'],
  providers: [
    ]
})

export class OperativeSentenceNewComponent extends AppBaseComponent implements OnInit {
  operativeSentenceForm: FormGroup;
  @Input() selectedOperativeSentence: OperativeSentence;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private bodyAttributesService: LookupService;
private judgmentResultsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
judgmentresultSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('judgmentresult', { static: true }) JudgmentresultSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<OperativeSentenceNewComponent>,
    public operativeSentenceService: OperativeSentenceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOperativeSentence = new OperativeSentence();

    
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

	this.judgmentresultSelectOptions = new MaterialSelectOptions({
	 data: this.judgmentResultsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نتيجة الحكم',
	});


    this.operativeSentenceForm = this.formBuilder.group({
     
  id : [0],
  fileNumber : [this.selectedOperativeSentence.fileNumber, [ Validators.required ]],
  entityName : [this.selectedOperativeSentence.entityName, [ ]],
  judgmentDate : [this.selectedOperativeSentence.judgmentDate, [ Validators.required ]],
  statement : [this.selectedOperativeSentence.statement, [ Validators.required ]],
  branchCode : [this.selectedOperativeSentence.branchCode, [ ]],
  entityType : [this.selectedOperativeSentence.entityType, [ ]],
  entityCode : [this.selectedOperativeSentence.entityCode, [ ]],
  whoIs : [this.selectedOperativeSentence.whoIs, [ ]],
  judgmentresult : [this.selectedOperativeSentence.judgmentresult, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.operativeSentenceService.create(this.operativeSentenceForm.value)
        .pipe(switchMap(x => {
			return this.operativeSentenceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.operativeSentenceForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.judgmentResultsService = new LookupService('judgmentresults', this.http);
  }
 }
