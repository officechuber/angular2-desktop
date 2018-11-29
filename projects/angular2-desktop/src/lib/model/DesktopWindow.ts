import {WindowState} from './WindowState';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import {ShortCut} from './ShortCut';
import {DockPosition} from './DockPosition';

export class DesktopWindow {

  private readonly animationDuration = 1000;
  title: string;
  clazz: string;
  animatedY: string;
  animatedX: string;
  id: string;
  state: BehaviorSubject<WindowState>;
  dockPosition: BehaviorSubject<DockPosition>;
  x: number;
  y: number;
  width: number;
  height: number;
  shortCut: ShortCut;
  hide:boolean=false;

  constructor(
    title: string,
    state: WindowState,
    dockPosition: DockPosition,
    x: number,
    y: number,
    width: number,
    height: number) {
    this.id = _.uniqueId('window_');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.state = new BehaviorSubject(state);
    this.dockPosition = new BehaviorSubject(dockPosition);
  }

  updateClass(): void {
    this.clazz = 'window';
    /*if (this.position.getValue() === WindowPosition.TOP) this.clazz += " window-top";
    else if (this.position.getValue() === WindowPosition.BOTTOM) this.clazz += " window-bottom";
    else if (this.position.getValue() === WindowPosition.LEFT) this.clazz += " window-left";
    else if (this.position.getValue() === WindowPosition.RIGHT) this.clazz += " window-right";
    else if (this.position.getValue() === WindowPosition.SIDEBAR_LEFT) this.clazz += " sidebar-left";
    else if (this.position.getValue() === WindowPosition.FIXED_TOP) this.clazz += " fixed-top";
    else if (this.position.getValue() === WindowPosition.FIXED_BOTTOM) this.clazz += " fixed-bottom";*/

    if (this.state.getValue() === WindowState.CLOSED) this.clazz += ' window-closed';
    else if (this.state.getValue() === WindowState.MAXIMIZED) this.clazz += ' window-maximized';
    else if (this.state.getValue() === WindowState.MINIMIZED) this.clazz += ' window-minimized';
    else if (this.state.getValue() === WindowState.DOCKED) {
      this.clazz += ' window-docked';
      if (this.dockPosition.getValue() === DockPosition.TOP) this.clazz += ' docked-top';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM) this.clazz += ' docked-bottom';
      else if (this.dockPosition.getValue() === DockPosition.TOP_LEFT) this.clazz += ' docked-top-left';
      else if (this.dockPosition.getValue() === DockPosition.TOP_RIGHT) this.clazz += ' docked-top-right';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM_LEFT) this.clazz += ' docked-bottom-left';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM_RIGHT) this.clazz += ' docked-bottom-right';
      else if (this.dockPosition.getValue() === DockPosition.LEFT) this.clazz += ' docked-left';
      else if (this.dockPosition.getValue() === DockPosition.RIGHT) this.clazz += ' docked-right';

    }

    /*if (this.active.getValue()) this.clazz += ' active';*/

  }

  isVisible(): boolean {
    return !this.hide && this.state.getValue() !== WindowState.CLOSED && this.state.getValue() !== WindowState.MINIMIZED;
  }


  isOpen(): boolean {
    return this.state.getValue() !== WindowState.CLOSED;
  }

  minimize(xPosition:number,desktopHeight:number): void {

    this.clazz += ' animation minimize';
    this.animatedY = desktopHeight+"px";
    this.animatedX = xPosition+"px";
    setTimeout(() => {
      this.animatedY = null;
      this.animatedX = null;
      this.state.next(WindowState.MINIMIZED);
    }, this.animationDuration);
  }

  close(): void {

    this.clazz += ' animation close';

    setTimeout(() => {
      this.state.next(WindowState.CLOSED);
    }, this.animationDuration);
  }

  normalize(): void {
    this.state.next(WindowState.NORMAL);
    this.clazz += ' animated fadeIn';
    this.hide=false;
  }

  maximize(): void {
    this.clazz += ' animation maximize';
    setTimeout(() => this.state.next(WindowState.MAXIMIZED), this.animationDuration);
  }

}
