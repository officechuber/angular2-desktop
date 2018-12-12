import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'a2d-desktop-shortcut',
  templateUrl: './desktop-shortcut.component.html',
  styleUrls: ['./desktop-shortcut.component.scss']
})
export class DesktopShortcutComponent implements OnInit {

  @Input() appId: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() x: number;
  @Input() y: number;
  @Input() @HostBinding('style.background-color') color: string;
  @Input() @HostBinding('style.width.px') width: number = 50;
  @Input() @HostBinding('style.height.px') height: number = 50;
  @Output() shortCutClicked: EventEmitter<string> = new EventEmitter();


  @HostBinding('class')
  get clazz() {
    return 'desktop-shortcut';
  }

  @HostBinding('style.transform')
  get transform() {
    return 'translate(' + this.x + 'px,' + this.y + 'px)';
  }

  @HostBinding('style.line-height')
  get lineHeight() {
    return this.height+"px";
  }




  constructor() {
  }

  ngOnInit() {
  }

}
