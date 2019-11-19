
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Adequacy } from 'app/shared/models/adequacy';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AdequacyService } from '../shared/adequacy.service';


@Component({
  selector: 'app-adequacy-new',
  templateUrl: './adequacy-new.component.html',
  styleUrls: ['./adequacy-new.component.scss'],
  providers: [
    ]
})

export class AdequacyNewComponent extends AppBaseComponent implements OnInit {
  adequacyForm: FormGroup;
  @Input() selectedAdequacy: Adequacy;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'maxLength',
	 errorMessage: 'اكبر درجة هي 100'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'اقل درجة هي 0'
	}
  ];

  private overallAppreciationsService: LookupService;

  
overallAppreciationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('overallAppreciation', { static: true }) OverallAppreciationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AdequacyNewComponent>,
    public adequacyService: AdequacyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdequacy = new Adequacy();

    
	this.overallAppreciationSelectOptions = new MaterialSelectOptions({
	 data: this.overallAppreciationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التقدير العام',
	});


    this.adequacyForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedAdequacy.employeeCode, [ ]],
  adequacyYear : [this.selectedAdequacy.adequacyYear, [ Validators.required ]],
  degree : [this.selectedAdequacy.degree, [ Validators.required,Validators.maxLength(100),Validators.minLength(0) ]],
  employeeName : [this.selectedAdequacy.employeeName, [ ]],
  overallAppreciation : [this.selectedAdequacy.overallAppreciation, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.adequacyService.create(this.adequacyForm.value)
        .pipe(switchMap(x => {
			return this.adequacyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.adequacyForm.get(name);
    }

  initializeLookupServices() {
    this.overallAppreciationsService = new LookupService('overallappreciations', this.http);
  }
 }
