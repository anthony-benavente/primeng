import { ElementRef, EventEmitter, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class TabViewNav {
    tabs: TabPanel[];
    orientation: string;
    onTabClick: EventEmitter<any>;
    onTabCloseClick: EventEmitter<any>;
    onTabDropSuccess: EventEmitter<any>;
    onContextMenu: EventEmitter<{}>;
    contextMenu(e: any, tab: TabPanel): void;
    getDefaultHeaderClass(tab: TabPanel): string;
    clickTab(event: any, tab: TabPanel): void;
    clickClose(event: any, tab: TabPanel): void;
    tabDrop(event: any): void;
}
export declare class TabPanel {
    header: string;
    selected: boolean;
    disabled: boolean;
    closable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    leftIcon: string;
    rightIcon: string;
    id: number;
    closed: boolean;
    lazy: boolean;
}
export declare class TabView implements AfterContentInit, BlockableUI {
    el: ElementRef;
    orientation: string;
    style: any;
    styleClass: string;
    controlClose: boolean;
    lazy: boolean;
    tabPanels: QueryList<TabPanel>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    onTabOrderChange: EventEmitter<any>;
    onTabInit: EventEmitter<any>;
    onTabRightClick: EventEmitter<{}>;
    initialized: boolean;
    tabs: TabPanel[];
    private _activeIndex;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    initTabs(): void;
    tabRightClick(e: any): void;
    open(event: Event, tab: TabPanel): void;
    close(event: Event, tab: TabPanel): void;
    closeTab(tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getBlockableElement(): HTMLElement;
    onDropSuccess(e: any): any;
    activeIndex: number;
}
export declare class TabViewModule {
}
