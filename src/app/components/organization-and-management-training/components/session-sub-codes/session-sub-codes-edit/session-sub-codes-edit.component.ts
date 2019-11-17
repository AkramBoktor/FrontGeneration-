
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SessionSubCodes } from 'app/shared/models/session-sub-codes';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SessionSubCodesService } from '../shared/session-sub-codes.service';




@Component({
  selector: 'app-session-sub-codes-edit',
  templateUrl: './session-sub-codes-edit.component.html',
  styleUrls: ['./session-sub-codes-edit.component.scss'],
  providers: []
})

export class SessionSubCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSessionSubCodes: SessionSubCodes;
  sessionSubCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSessionSubCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<SessionSubCodesEditComponent>,
    public sessionSubCodesService: SessionSubCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSessionSubCodes = new SessionSubCodes();
    this.selectedSessionSubCodes = this.selectedSessionSubCodesDialog.data || this.selectedSessionSubCodes;

    
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


    this.sessionSubCodesForm = this.formBuilder.group({
      
  id : [this.selectedSessionSubCodes.id],
  courseName : [this.selectedSessionSubCodes.courseName, [ Validators.required ]],
  majorClassification : [this.selectedSessionSubCodes.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedSessionSubCodes.subcategory, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sessionSubCodesService.update(this.sessionSubCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sessionSubCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sessionSubCodesForm.get(name);
  }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}
