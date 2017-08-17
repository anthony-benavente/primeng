import { ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, OnInit, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
export declare const CALENDAR_VALUE_ACCESSOR: any;
export declare const CALENDAR_VALIDATOR: any;
export interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
}
export declare class Calendar implements AfterViewInit, AfterViewChecked, OnInit, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    defaultDate: Date;
    style: string;
    styleClass: string;
    inputStyle: string;
    inputId: string;
    inputStyleClass: string;
    placeholder: string;
    disabled: any;
    dateFormat: string;
    inline: boolean;
    showOtherMonths: boolean;
    selectOtherMonths: boolean;
    showIcon: boolean;
    icon: string;
    appendTo: any;
    readonlyInput: boolean;
    shortYearCutoff: any;
    monthNavigator: boolean;
    yearNavigator: boolean;
    yearRange: string;
    showTime: boolean;
    hourFormat: string;
    timeOnly: boolean;
    stepHour: number;
    stepMinute: number;
    stepSecond: number;
    showSeconds: boolean;
    required: boolean;
    showOnFocus: boolean;
    dataType: string;
    disabledDates: Array<Date>;
    disabledDays: Array<number>;
    utc: boolean;
    selectionMode: string;
    maxDateCount: number;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onClose: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    onInput: EventEmitter<any>;
    _locale: LocaleSettings;
    tabindex: number;
    overlayViewChild: ElementRef;
    inputfieldViewChild: ElementRef;
    value: any;
    dates: any[];
    weekDays: string[];
    currentMonthText: string;
    currentMonth: number;
    currentYear: number;
    currentHour: number;
    currentMinute: number;
    currentSecond: number;
    pm: boolean;
    overlay: HTMLDivElement;
    overlayVisible: boolean;
    overlayShown: boolean;
    datepickerClick: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    calendarElement: any;
    documentClickListener: any;
    ticksTo1970: number;
    yearOptions: number[];
    focus: boolean;
    isKeydown: boolean;
    filled: boolean;
    inputFieldValue: string;
    _minDate: Date;
    _maxDate: Date;
    _isValid: boolean;
    preventDocumentListener: boolean;
    minDate: Date;
    maxDate: Date;
    locale: LocaleSettings;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    createWeekDays(): void;
    createMonth(month: number, year: number): void;
    prevMonth(event: any): void;
    nextMonth(event: any): void;
    onDateSelect(event: any, dateMeta: any): void;
    shouldSelectDate(dateMeta: any): boolean;
    updateInputfield(): void;
    formatDateTime(date: any): any;
    selectDate(dateMeta: any): void;
    updateModel(value: any): void;
    getFirstDayOfMonthIndex(month: number, year: number): number;
    getDaysCountInMonth(month: number, year: number): number;
    getDaysCountInPrevMonth(month: number, year: number): number;
    getPreviousMonthAndYear(month: number, year: number): {
        'month': any;
        'year': any;
    };
    getNextMonthAndYear(month: number, year: number): {
        'month': any;
        'year': any;
    };
    getSundayIndex(): number;
    isSelected(dateMeta: any): boolean;
    isDateEquals(value: any, dateMeta: any): boolean;
    isDateBetween(start: any, end: any, dateMeta: any): boolean;
    isSingleSelection(): boolean;
    isRangeSelection(): boolean;
    isMultipleSelection(): boolean;
    isToday(today: any, day: any, month: any, year: any): boolean;
    isSelectable(day: any, month: any, year: any): boolean;
    isDateDisabled(day: number, month: number, year: number): boolean;
    isDayDisabled(day: number, month: number, year: number): boolean;
    onInputFocus(event: Event): void;
    onInputBlur(event: Event): void;
    onButtonClick(event: any, inputfield: any): void;
    onInputKeydown(event: any): void;
    onMonthDropdownChange(m: string): void;
    onYearDropdownChange(y: string): void;
    incrementHour(event: any): void;
    decrementHour(event: any): void;
    incrementMinute(event: any): void;
    decrementMinute(event: any): void;
    incrementSecond(event: any): void;
    decrementSecond(event: any): void;
    updateTime(): void;
    toggleAMPM(event: any): void;
    onUserInput(event: any): void;
    parseValueFromString(text: string): Date;
    parseDateTime(text: any): Date;
    populateTime(value: any, timeString: any, ampm: any): void;
    updateUI(): void;
    onDatePickerClick(event: any): void;
    showOverlay(): void;
    alignOverlay(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    formatDate(date: any, format: any): string;
    formatTime(date: any): string;
    parseTime(value: any): {
        hour: number;
        minute: number;
        second: number;
    };
    parseDate(value: any, format: any): any;
    daylightSavingAdjust(date: any): any;
    updateFilledState(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
    validate(c: AbstractControl): {
        invalidDate: boolean;
    };
}
export declare class CalendarModule {
}
