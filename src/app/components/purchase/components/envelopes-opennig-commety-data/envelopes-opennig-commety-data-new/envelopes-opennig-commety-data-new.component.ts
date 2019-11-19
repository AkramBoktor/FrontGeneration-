
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EnvelopesOpennigCommetyData } from 'app/shared/models/envelopes-opennig-commety-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnvelopesOpennigCommetyDataService } from '../shared/envelopes-opennig-commety-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-envelopes-opennig-commety-data-new',
  templateUrl: './envelopes-opennig-commety-data-new.component.html',
  styleUrls: ['./envelopes-opennig-commety-data-new.component.scss'],
  providers: [
    ]
})

export class EnvelopesOpennigCommetyDataNewComponent extends AppBaseComponent implements OnInit {
  envelopesOpennigCommetyDataForm: FormGroup;
  @Input() selectedEnvelopesOpennigCommetyData: EnvelopesOpennigCommetyData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyDataNewComponent>,
    public envelopesOpennigCommetyDataService: EnvelopesOpennigCommetyDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyData = new EnvelopesOpennigCommetyData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.envelopesOpennigCommetyDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedEnvelopesOpennigCommetyData.bidNumber, [ Validators.required ]],
  committeeDate : [this.selectedEnvelopesOpennigCommetyData.committeeDate, [ Validators.required ]],
  committeeHeadquarters : [this.selectedEnvelopesOpennigCommetyData.committeeHeadquarters, [ Validators.required ]],
  offeringApprovalDate : [this.selectedEnvelopesOpennigCommetyData.offeringApprovalDate, [ Validators.required ]],
  openingFinancialEnvelopesDate : [this.selectedEnvelopesOpennigCommetyData.openingFinancialEnvelopesDate, [ Validators.required ]],
  approvalFormationDate : [this.selectedEnvelopesOpennigCommetyData.approvalFormationDate, [ Validators.required ]],
  tenderPosition : [this.selectedEnvelopesOpennigCommetyData.tenderPosition, [ Validators.required ]],
  offeringType : [this.selectedEnvelopesOpennigCommetyData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.envelopesOpennigCommetyDataService.create(this.envelopesOpennigCommetyDataForm.value)
        .pipe(switchMap(x => {
			return this.envelopesOpennigCommetyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.envelopesOpennigCommetyDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
