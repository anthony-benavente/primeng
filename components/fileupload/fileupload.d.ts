import { OnInit, EventEmitter, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../common/message';
export declare class FileUpload implements OnInit, AfterContentInit {
    private sanitizer;
    name: string;
    url: string;
    method: string;
    multiple: boolean;
    accept: string;
    disabled: boolean;
    auto: boolean;
    withCredentials: boolean;
    maxFileSize: number;
    invalidFileSizeMessageSummary: string;
    invalidFileSizeMessageDetail: string;
    invalidFileTypeMessageSummary: string;
    invalidFileTypeMessageDetail: string;
    style: string;
    styleClass: string;
    previewWidth: number;
    chooseLabel: string;
    uploadLabel: string;
    cancelLabel: string;
    showUploadButton: boolean;
    showCancelButton: boolean;
    mode: string;
    customUpload: boolean;
    onBeforeUpload: EventEmitter<any>;
    onBeforeSend: EventEmitter<any>;
    onUpload: EventEmitter<any>;
    onError: EventEmitter<any>;
    onClear: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    uploadHandler: EventEmitter<any>;
    templates: QueryList<any>;
    files: File[];
    progress: number;
    dragHighlight: boolean;
    msgs: Message[];
    fileTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    toolbarTemplate: TemplateRef<any>;
    focus: boolean;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    onChooseClick(event: any, fileInput: any): void;
    onFileSelect(event: any): void;
    validate(file: File): boolean;
    private isFileTypeValid(file);
    getTypeClass(fileType: string): string;
    isWildcard(fileType: string): boolean;
    getFileExtension(file: File): string;
    isImage(file: File): boolean;
    onImageLoad(img: any): void;
    upload(): void;
    clear(): void;
    remove(event: Event, index: number): void;
    hasFiles(): boolean;
    onDragEnter(e: any): void;
    onDragOver(e: any): void;
    onDragLeave(event: any): void;
    onDrop(event: any): void;
    onFocus(): void;
    onBlur(): void;
    formatSize(bytes: any): string;
    onSimpleUploaderClick(event: Event): void;
}
export declare class FileUploadModule {
}
