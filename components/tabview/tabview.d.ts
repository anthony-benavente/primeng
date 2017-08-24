import { ElementRef, EventEmitter, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class TabViewNav {
    tabs: TabPanel[];
    orientation: string;
    onTabClick: EventEmitter<any>;
    onTabCloseClick: EventEmitter<any>;
    onTabDropSuccess: EventEmitter<any>;
<<<<<<< HEAD
    onContextMenu: EventEmitter<{}>;
    contextMenu(e: any, tab: TabPanel): void;
=======
>>>>>>> 6ecf3ef6ea18e17304812e1f25ac8641f3dcdb58
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
<<<<<<< HEAD
    onTabRightClick: EventEmitter<{}>;
=======
>>>>>>> 6ecf3ef6ea18e17304812e1f25ac8641f3dcdb58
    initialized: boolean;
    tabs: TabPanel[];
    private _activeIndex;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    initTabs(): void;
<<<<<<< HEAD
    tabRightClick(e: any): void;
=======
>>>>>>> 6ecf3ef6ea18e17304812e1f25ac8641f3dcdb58
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
