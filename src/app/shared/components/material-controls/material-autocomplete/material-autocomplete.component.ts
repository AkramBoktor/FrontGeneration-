import { Component, Input, OnInit, Optional, Self, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { LookupModelAutoComplete } from 'app/shared/models/controls/lookup.model';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MaterialAutocompleteOptions } from 'app/shared/models/controls/material-autocomplete.model';

@Component({
  selector: 'app-material-autocomplete',
  templateUrl: './material-autocomplete.component.html',
  styleUrls: ['./material-autocomplete.component.scss']
})
export class MaterialAutocompleteComponent implements OnInit, ControlValueAccessor, OnDestroy {
  getDisplayNameFunction = this.getDisplayName.bind(this);
	
  private subscriptions: Subscription[] = [];
  @Input() options: MaterialAutocompleteOptions;
  @ViewChild('matAutoCompleteInput', { static: true }) matAutoCompleteInput: any;

  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  public matCodeInput = new FormControl();

  public matNameInputChanged$ = new Subject<string>();
  public matCodeInputChanged$ = new Subject<string>();

  // current filtered data visible in the drop down list.
  public currentVisibleData: any[];

  // store the filtered data for comparison.
  private currentFilteredData: any[];
  // store the current selected name for comparison
  private currentSelectedName: string;

  public isLoading = true;
  private debounceTime = 500; // debounce time in ms.
  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit() {
    // handle disabled state.
    if (this.options.disabled || this.control.disabled) {
      this.matAutoCompleteInput.disabled = true;
      this.matCodeInput.disable();
    }

    // handle error state.
    this.matAutoCompleteInput.errorStateMatcher = {
      isErrorState: () => {
        return !!(this.control && this.control.invalid && this.control.dirty && this.control.touched);
      }
    };
  }

  private initialize(initialValue) {
    // subscribe to code changes.
    this.subscriptions.push(
      this.matCodeInputChanged$.pipe(
        startWith(initialValue),
        debounceTime(this.debounceTime),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((inputCode: string) => this.options.dataService({
          ...this.options.fetchModel,
          code: inputCode
        }) // fetch lookup by code.
          .pipe(
            map(filteredList => ({ val: inputCode, filteredList: filteredList })),
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      ).subscribe(mapReturn => { // mapReturn => { val: inputCode, filteredList: filteredList }
        // currentFilteredData and currentVisibleData will be the same in case of fetch by code.
        this.currentFilteredData = mapReturn.filteredList;
        this.currentVisibleData = this.currentFilteredData;

        this.matCodeInput.setValue(mapReturn.val);

        this.setcurrentSelectedName(mapReturn);
      })
    );

    // subscribe to name changes.
    this.subscriptions.push(
      this.matNameInputChanged$.pipe(
        debounceTime(this.debounceTime),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((inputName: string) => this.options.dataService({
          ...this.options.fetchModel,
          name: inputName
        }) // fetch lookup by name.
          .pipe(
            map(filteredList => ({ val: inputName, filteredList: filteredList })),
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      ).subscribe(mapReturn => { // mapReturn => { val: inputName, filteredList: filteredList }
        // currentVisibleData temporary changes due to fetch by name.
        this.currentVisibleData = mapReturn.filteredList;
      })
    );
  }

  onSelectionChanged(value: LookupModelAutoComplete) {
    this.currentFilteredData = this.currentVisibleData;
    this.currentSelectedName = value[this.options.fetchModel.nameField];
    this.matCodeInput.setValue(value[this.options.fetchModel.codeField]);
    this.applyPropagateChange(value[this.options.fetchModel.codeField]); // ## id
    this.emitSelectionChanged(value);
  }

  private setcurrentSelectedName(mappedReturn: { val: string, filteredList: LookupModelAutoComplete[] }) {
    // Empty code entered => revert to last selected name.
    if (mappedReturn.val === '' || mappedReturn.val === null) {
      this.matCodeInput.setErrors(null);
      this.currentSelectedName = '';
      this.matAutoCompleteInput.value = this.currentSelectedName;
      this.applyPropagateChange(null);
      this.emitSelectionChanged({});
    }
    // Code retrieves an empty list => set error + revert to last selected name.
    else if (mappedReturn.filteredList.length === 0) {
      this.matCodeInput.setErrors({ undefinedCode: true });
      this.currentSelectedName = '';
      this.matAutoCompleteInput.value = this.currentSelectedName;
      this.applyPropagateChange(null);
      this.emitSelectionChanged({});
    }
    // Set first item in list as current selected name + propagate code value.
    else {
      this.matCodeInput.setErrors(null);
      this.currentSelectedName = mappedReturn.filteredList[0][this.options.fetchModel.nameField];
      this.matAutoCompleteInput.value = this.currentSelectedName;
      this.applyPropagateChange(mappedReturn.filteredList[0][this.options.fetchModel.codeField]);
      this.emitSelectionChanged(mappedReturn.filteredList[0]);
    }
  }

  onAutoCompleteClosed() {
    // when drop down closed without selecting an item: assign previous values.
    if (this.matAutoCompleteInput.value !== this.currentSelectedName) {
      this.currentVisibleData = this.currentFilteredData;
      this.matAutoCompleteInput.value = this.currentSelectedName;
    }
  }

  // -------------------------------------- //
  private applyPropagateChange(code: string) {

    this.propagateChange(code);
    this.matAutoCompleteInput.updateErrorState();
  }

  private emitSelectionChanged(selectionItem: any) {
    this.selectionChanged.emit(selectionItem);
  }

  
  getDisplayName(option) {
    return option ? option[this.options.fetchModel.nameField] : '';
  }


  // -------- Control Value Accessor methods --------
  private propagateChange = (_: any) => { };
  private propagateTouched = () => { };

  writeValue(code: string): void { // ## id
    this.initialize(code);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.matAutoCompleteInput.disabled = this.options.disabled; // disabled = isDisabled;
  }

  onTouched() {
    if (this.currentVisibleData && this.currentVisibleData.length === 0) {
      this.currentVisibleData = this.currentFilteredData;
      this.matAutoCompleteInput.value = this.currentSelectedName;
    }
    this.propagateTouched();
    this.matAutoCompleteInput.updateErrorState();
  }

  get errorState() {
    return this.control.errors !== null && !!this.control.touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
