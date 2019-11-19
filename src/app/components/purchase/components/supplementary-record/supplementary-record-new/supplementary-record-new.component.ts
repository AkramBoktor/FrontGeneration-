
import { Component, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SupplementaryRecord } from 'app/shared/models/supplementary-record';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SupplementaryRecordService } from '../shared/supplementary-record.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-supplementary-record-new',
  templateUrl: './supplementary-record-new.component.html',
  styleUrls: ['./supplementary-record-new.component.scss'],
  providers: [
  ]
})

export class SupplementaryRecordNewComponent extends AppBaseComponent implements OnInit {
  supplementaryRecordForm: FormGroup;
  @Input() selectedSupplementaryRecord: SupplementaryRecord;
  errorMessages: FormControlError[] = [

  ];

  private offeringTypesService: LookupService;
  private classificationDegreesService: LookupService;
  private commissionerRequirementsService: LookupService;


  offeringTypeSelectOptions: MaterialSelectOptions;
  classificationDegreeSelectOptions: MaterialSelectOptions;
  contributionsAfterNegotiationSelectOptions: MaterialSelectOptions;


  @ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
  @ViewChild('classificationDegree', { static: true }) ClassificationDegreeSelectComponent: MaterialSelectComponent;
  @ViewChild('contributionsAfterNegotiation', { static: true }) ContributionsAfterNegotiationSelectComponent: MaterialSelectComponent;



  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SupplementaryRecordNewComponent>,
    public supplementaryRecordService: SupplementaryRecordService) {
    super(injector);
  }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSupplementaryRecord = new SupplementaryRecord();


    this.offeringTypeSelectOptions = new MaterialSelectOptions({
      data: this.offeringTypesService.getAll(),
      errorMessages: this.errorMessages,
      label: 'نوع الطرح',
    });

    this.classificationDegreeSelectOptions = new MaterialSelectOptions({
      data: this.classificationDegreesService.getAll(),
      errorMessages: this.errorMessages,
      label: 'درجة التصنيف',
    });

    this.contributionsAfterNegotiationSelectOptions = new MaterialSelectOptions({
      data: this.commissionerRequirementsService.getAll(),
      errorMessages: this.errorMessages,
      label: 'اشتراكات بعد المفاوضة',
    });


    this.supplementaryRecordForm = this.formBuilder.group({

      id: [0],
      recordNumber: [this.selectedSupplementaryRecord.recordNumber, [Validators.required]],
      bidNumber: [this.selectedSupplementaryRecord.bidNumber, [Validators.required]],
      tenderNumber: [this.selectedSupplementaryRecord.tenderNumber, [Validators.required]],
      contractorCode: [this.selectedSupplementaryRecord.contractorCode, []],
      companyName: [this.selectedSupplementaryRecord.companyName, []],
      school: [this.selectedSupplementaryRecord.school, []],
      advancePayment: [this.selectedSupplementaryRecord.advancePayment, []],
      assayValue: [this.selectedSupplementaryRecord.assayValue, []],
      tenderTotalValue: [this.selectedSupplementaryRecord.tenderTotalValue, []],
      bonusProvided: [this.selectedSupplementaryRecord.bonusProvided, []],
      durationExecution: [this.selectedSupplementaryRecord.durationExecution, []],
      plenipotentiary: [this.selectedSupplementaryRecord.plenipotentiary, []],
      negotiationEndedBouns: [this.selectedSupplementaryRecord.negotiationEndedBouns, [Validators.required]],
      downPaymentRatio: [this.selectedSupplementaryRecord.downPaymentRatio, [Validators.required]],
      bouns: [this.selectedSupplementaryRecord.bouns, [Validators.required]],
      value: [this.selectedSupplementaryRecord.value, [Validators.required]],
      reason: [this.selectedSupplementaryRecord.reason, [Validators.required]],
      offeringType: [this.selectedSupplementaryRecord.offeringType, [Validators.required]],
      classificationDegree: [this.selectedSupplementaryRecord.classificationDegree, [Validators.required]],
      contributionsAfterNegotiation: [this.selectedSupplementaryRecord.contributionsAfterNegotiation, [Validators.required]]
    }, {
      validators: []
    });



  }
  onSubmit() {
    this.supplementaryRecordService.create(this.supplementaryRecordForm.value)
      .pipe(switchMap(x => {
        return this.supplementaryRecordService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
      }))
      .subscribe(result => {
        this.onBack();
      });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.supplementaryRecordForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
    this.classificationDegreesService = new LookupService('classificationdegrees', this.http);
    this.commissionerRequirementsService = new LookupService('commissionerrequirements', this.http);
  }
}
