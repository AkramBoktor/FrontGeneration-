
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NetworkBudgetObservationsData } from 'app/shared/models/network-budget-observations-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NetworkBudgetObservationsDataService } from '../shared/network-budget-observations-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-network-budget-observations-data-new',
  templateUrl: './network-budget-observations-data-new.component.html',
  styleUrls: ['./network-budget-observations-data-new.component.scss'],
  providers: [
    ]
})

export class NetworkBudgetObservationsDataNewComponent extends AppBaseComponent implements OnInit {
  networkBudgetObservationsDataForm: FormGroup;
  @Input() selectedNetworkBudgetObservationsData: NetworkBudgetObservationsData;
  errorMessages: FormControlError[] = [
        
  ];

  private networkNoteTypeCodesService: LookupService;
private directionCodesService: LookupService;

  
networkNoteTypeCodeSelectOptions: MaterialSelectOptions;
borderCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('networkNoteTypeCode', { static: true }) NetworkNoteTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('borderCode', { static: true }) BorderCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NetworkBudgetObservationsDataNewComponent>,
    public networkBudgetObservationsDataService: NetworkBudgetObservationsDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNetworkBudgetObservationsData = new NetworkBudgetObservationsData();

    
	this.networkNoteTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.networkNoteTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع ملاحظة الشبكة',
	});

	this.borderCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحد',
	});


    this.networkBudgetObservationsDataForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedNetworkBudgetObservationsData.landID, [ Validators.required ]],
  averageHeightValues : [this.selectedNetworkBudgetObservationsData.averageHeightValues, [ Validators.required ]],
  averageValuesDecline : [this.selectedNetworkBudgetObservationsData.averageValuesDecline, [ Validators.required ]],
  networkNoteTypeCode : [this.selectedNetworkBudgetObservationsData.networkNoteTypeCode, [ Validators.required ]],
  borderCode : [this.selectedNetworkBudgetObservationsData.borderCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.networkBudgetObservationsDataService.create(this.networkBudgetObservationsDataForm.value)
        .pipe(switchMap(x => {
			return this.networkBudgetObservationsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.networkBudgetObservationsDataForm.get(name);
    }

  initializeLookupServices() {
    this.networkNoteTypeCodesService = new LookupService('networknotetypecodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
 }
