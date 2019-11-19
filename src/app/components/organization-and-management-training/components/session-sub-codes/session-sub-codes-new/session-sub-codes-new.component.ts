
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SessionSubCodes } from 'app/shared/models/session-sub-codes';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SessionSubCodesService } from '../shared/session-sub-codes.service';


@Component({
  selector: 'app-session-sub-codes-new',
  templateUrl: './session-sub-codes-new.component.html',
  styleUrls: ['./session-sub-codes-new.component.scss'],
  providers: [
    ]
})

export class SessionSubCodesNewComponent extends AppBaseComponent implements OnInit {
  sessionSubCodesForm: FormGroup;
  @Input() selectedSessionSubCodes: SessionSubCodes;
  errorMessages: FormControlError[] = [
        
  ];

  private commissionChairmanDecisionsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SessionSubCodesNewComponent>,
    public sessionSubCodesService: SessionSubCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSessionSubCodes = new SessionSubCodes();

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.commissionChairmanDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});


    this.sessionSubCodesForm = this.formBuilder.group({
     
  id : [0],
  courseName : [this.selectedSessionSubCodes.courseName, [ Validators.required ]],
  majorClassification : [this.selectedSessionSubCodes.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedSessionSubCodes.subcategory, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.sessionSubCodesService.create(this.sessionSubCodesForm.value)
        .pipe(switchMap(x => {
			return this.sessionSubCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.sessionSubCodesForm.get(name);
    }

  initializeLookupServices() {
    this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
 }
