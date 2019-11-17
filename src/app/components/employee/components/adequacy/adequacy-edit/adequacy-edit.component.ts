
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Adequacy } from 'app/shared/models/adequacy';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AdequacyService } from '../shared/adequacy.service';




@Component({
  selector: 'app-adequacy-edit',
  templateUrl: './adequacy-edit.component.html',
  styleUrls: ['./adequacy-edit.component.scss'],
  providers: []
})

export class AdequacyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdequacy: Adequacy;
  adequacyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private overallAppreciationsService: LookupService;

  
overallAppreciationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('overallAppreciation', { static: true }) OverallAppreciationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdequacyDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdequacyEditComponent>,
    public adequacyService: AdequacyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdequacy = new Adequacy();
    this.selectedAdequacy = this.selectedAdequacyDialog.data || this.selectedAdequacy;

    
	this.overallAppreciationSelectOptions = new MaterialSelectOptions({
	 data: this.overallAppreciationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التقدير العام',
	});


    this.adequacyForm = this.formBuilder.group({
      
  id : [this.selectedAdequacy.id],
  employeeCode : [this.selectedAdequacy.employeeCode, [ ]],
  adequacyYear : [this.selectedAdequacy.adequacyYear, [ Validators.required ]],
  degree : [this.selectedAdequacy.degree, [ Validators.required ]],
  employeeName : [this.selectedAdequacy.employeeName, [ ]],
  overallAppreciation : [this.selectedAdequacy.overallAppreciation, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.adequacyService.update(this.adequacyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.adequacyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.adequacyForm.get(name);
  }

  initializeLookupServices() {
    this.overallAppreciationsService = new LookupService('overallappreciations', this.http);
  }
}
