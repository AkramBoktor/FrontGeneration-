
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssigningTheCaseToANewLawyer } from 'app/shared/models/assigning-the-case-to-a-new-lawyer';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AssigningTheCaseToANewLawyerService } from '../shared/assigning-the-case-to-a-new-lawyer.service';


@Component({
  selector: 'app-assigning-the-case-to-a-new-lawyer-new',
  templateUrl: './assigning-the-case-to-a-new-lawyer-new.component.html',
  styleUrls: ['./assigning-the-case-to-a-new-lawyer-new.component.scss'],
  providers: [
    ]
})

export class AssigningTheCaseToANewLawyerNewComponent extends AppBaseComponent implements OnInit {
  assigningTheCaseToANewLawyerForm: FormGroup;
  @Input() selectedAssigningTheCaseToANewLawyer: AssigningTheCaseToANewLawyer;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private issueCodeIssuesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssigningTheCaseToANewLawyerNewComponent>,
    public assigningTheCaseToANewLawyerService: AssigningTheCaseToANewLawyerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssigningTheCaseToANewLawyer = new AssigningTheCaseToANewLawyer();

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});


    this.assigningTheCaseToANewLawyerForm = this.formBuilder.group({
     
  id : [0],
  fileNumber : [this.selectedAssigningTheCaseToANewLawyer.fileNumber, [ Validators.required ]],
  lawsuitNumber : [this.selectedAssigningTheCaseToANewLawyer.lawsuitNumber, [ ]],
  year : [this.selectedAssigningTheCaseToANewLawyer.year, [ ]],
  incomingDate : [this.selectedAssigningTheCaseToANewLawyer.incomingDate, [ ]],
  employeeCode : [this.selectedAssigningTheCaseToANewLawyer.employeeCode, [ ]],
  receiptAttorneyDate : [this.selectedAssigningTheCaseToANewLawyer.receiptAttorneyDate, [ Validators.required ]],
  branchCode : [this.selectedAssigningTheCaseToANewLawyer.branchCode, [ ]],
  entityType : [this.selectedAssigningTheCaseToANewLawyer.entityType, [ ]],
  issueCode : [this.selectedAssigningTheCaseToANewLawyer.issueCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assigningTheCaseToANewLawyerService.create(this.assigningTheCaseToANewLawyerForm.value)
        .pipe(switchMap(x => {
			return this.assigningTheCaseToANewLawyerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assigningTheCaseToANewLawyerForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
  }
 }
