import { NgModule, Component, ElementRef, Input, Output, EventEmitter, HostListener, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI} from '../common/blockableui';
import { DndModule } from 'ng2-dnd';

@Component({
    selector: '[p-tabViewNav]',
    host:{
        '[class.ui-tabview-nav]': 'true',
        '[class.ui-helper-reset]': 'true',
        '[class.ui-helper-clearfix]': 'true',
        '[class.ui-widget-header]': 'true',
        '[class.ui-corner-all]': 'true'
    },
    template: `
        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index" >
            <li dnd-sortable [sortableIndex]="i" [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="tab"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" (onDropSuccess)="tabDrop($event)" [id]="i"
                [attr.aria-expanded]="tab.selected" [attr.aria-selected]="tab.selected" (contextmenu)="contextMenu($event, tab)">
                <a href="#">
                    <span class="ui-tabview-left-icon fa" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                    <span class="ui-tabview-title">{{tab.header}}</span>
                    <span class="ui-tabview-right-icon fa" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close fa fa-close" (click)="clickClose($event,tab)"></span>
            </li>
        </ng-template>
    `,
})
export class TabViewNav {
    @Input() tabs: TabPanel[];

    @Input() orientation: string = 'top';
    
    @Output() onTabClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onTabCloseClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onTabDropSuccess: EventEmitter<any> = new EventEmitter();

    @Output() onContextMenu = new EventEmitter();

    contextMenu(e: any, tab: TabPanel) {
        this.onContextMenu.emit({
            event: e,
            tab: tab
        });
    }

    getDefaultHeaderClass(tab:TabPanel) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation; 
        if(tab && tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
    
    clickTab(event, tab: TabPanel) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        })
    }
    
    clickClose(event, tab: TabPanel) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        })
    }

    tabDrop(event: any): void {
        this.onTabDropSuccess.emit({
            currentTabs: this.tabs
        });
    }
}

@Component({
    selector: 'p-tabPanel',
    template: `
        <div class="ui-tabview-panel ui-widget-content" [style.display]="selected ? 'block' : 'none'" 
            role="tabpanel" [attr.aria-hidden]="!selected" *ngIf="closed ? false : (lazy ? selected : true)">
            <ng-content></ng-content>
        </div>
    `
})
export class TabPanel {

    @Input() header: string;

    @Input() selected: boolean;
    
    @Input() disabled: boolean;
    
    @Input() closable: boolean;
    
    @Input() headerStyle: any;
    
    @Input() headerStyleClass: string;
    
    @Input() leftIcon: string;
    
    @Input() rightIcon: string;

    @Input() id: number;
        
    public closed: boolean;
    
    public lazy: boolean;
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul dnd-sortable-container p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation" 
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)" [sortableData]="tabs"
                (onTabDropSuccess)="onDropSuccess($event)" (onContextMenu)="tabRightClick($event)"></ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav dnd-sortable-container role="tablist" *ngIf="orientation=='bottom'" [sortableData]="tabs" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"
                (onTabDropSuccess)="onDropSuccess($event)"></ul>
        </div>
    `,
})
export class TabView implements AfterContentInit,BlockableUI {

    @Input() orientation: string = 'top';
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() controlClose: boolean;
    
    @Input() lazy: boolean;
    
    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onTabOrderChange: EventEmitter<any> = new EventEmitter();

    @Output() onTabInit: EventEmitter<any> = new EventEmitter();

    @Output() onTabRightClick = new EventEmitter();
    
    initialized: boolean;
    
    tabs: TabPanel[];
    
    private _activeIndex: number;

    constructor(public el: ElementRef) {}
    
    ngAfterContentInit() {
        this.initTabs();
        
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });

        this.onTabInit.emit();
    }
    
    initTabs(): void {
        this.tabs = this.tabPanels.toArray();
        for(let tab of this.tabs) {
            tab.lazy = this.lazy;
        }
        
        let selectedTab: TabPanel = this.findSelectedTab();
        if(!selectedTab && this.tabs.length) {
            if(this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else 
                this.tabs[0].selected = true;
        }
    }

    tabRightClick(e: any) {
        this.onTabRightClick.emit(e);
    }
            
    open(event: Event, tab: TabPanel) {
        if(tab.disabled) {
            if(event) {
                event.preventDefault();
            }
            return;
        }
        
        if(!tab.selected) {
            let selectedTab: TabPanel = this.findSelectedTab();
            if(selectedTab) {
                selectedTab.selected = false
            }
            tab.selected = true;
            this.onChange.emit({originalEvent: event, index: this.findTabIndex(tab)});
        }
        
        if(event) {
            event.preventDefault();
        }
    }
    
    close(event: Event, tab: TabPanel) {  
        if(this.controlClose) {
            this.onClose.emit({
                originalEvent: event, 
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }}
            );
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event, 
                index: this.findTabIndex(tab)
            });
        }
        
        event.stopPropagation();
    }
    
    closeTab(tab: TabPanel) {
        if(tab.selected) {
            tab.selected = false;
            for(let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if(!tabPanel.closed&&!tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        
        tab.closed = true;
    }
    
    findSelectedTab() {
        for(let i = 0; i < this.tabs.length; i++) {
            if(this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    
    findTabIndex(tab: TabPanel) {
        let index = -1;
        for(let i = 0; i < this.tabs.length; i++) {
            if(this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    
    onDropSuccess(e: any): any {
        // Propogate the change in the order of tabs
        this.onTabOrderChange.emit(e);
    }

    @Input() get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(val:number) {
        this._activeIndex = val;
        
        if(this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }        
    }
}


@NgModule({
    imports: [CommonModule, DndModule.forRoot()],
    exports: [TabView,TabPanel,TabViewNav],
    declarations: [TabView,TabPanel,TabViewNav]
})
export class TabViewModule { }