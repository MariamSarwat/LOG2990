import { Component } from '@angular/core';
import { SelectionService } from 'src/app/services/selection/selection.service';
import { ShortcutsService } from 'src/app/services/shortcuts/shortcuts.service';

enum MagnetismOptions {
  AFFICHER = 'Activer',
  CACHER = 'Désactiver',
}

const ANGLE = 0;
@Component({
  selector: 'app-attributes-select',
  templateUrl: './attributes-select.component.html',
  styleUrls: ['./attributes-select.component.scss'],
})
export class AttributesSelectComponent {
  private stateBox: boolean;
  private copied = false;
  private clipboardFull: boolean;
  private angle = ANGLE;
  private buttonText = MagnetismOptions.AFFICHER;
  private isMagnetised: boolean;
  private magneticPoint: string;
  private rotationChoosen = false;
  private mouseScrollOn = false;

  constructor(private selectionService: SelectionService, private shortcutsService: ShortcutsService) {
    this.selectionService.getBoxCreated().subscribe((value) => this.stateBoxCreated(value));
    this.selectionService.getClipboardArray().subscribe((value) => this.stateClipboard(value));
    this.shortcutsService.currentStateMouseScroll.subscribe((value) => this.stateRotationWhenScroll(value));
    this.shortcutsService.getMagnetism().subscribe((value) => this.stateMagnetism(value));
    this.magneticPoint = this.selectionService.magneticPoint ;
  }

  private toggleMagnetism(): void {
    this.isMagnetised = !this.isMagnetised;
    this.buttonText = this.isMagnetised ? MagnetismOptions.CACHER : MagnetismOptions.AFFICHER;
    this.selectionService.isMagnetised = this.isMagnetised;
  }

  stateMagnetism(state: boolean): void {
    this.buttonText = state ? MagnetismOptions.CACHER : MagnetismOptions.AFFICHER;
  }

  private selectAll(): void {
    this.selectionService.selectAllElements();
  }

  private copy(): void {
    if (this.stateBox) {
      this.selectionService.copy();
      this.copied = true;
    }
  }

  private paste(): void {
    this.selectionService.paste();
  }

  private cut(): void {
    this.selectionService.cut();
  }

  private duplicate(): void {
    this.selectionService.duplicate();
  }

  private delete(): void {
    this.selectionService.delete();
  }

  private stateBoxCreated(boxCreated: boolean): void {
    this.stateBox = boxCreated;
  }

  private stateRotationButton(): void {
    this.rotationChoosen = true;
  }

  stateRotationWhenScroll(state: boolean): void {
    this.mouseScrollOn = state;
    if (this.mouseScrollOn) {
      this.setRotation(' ');
      this.angle = 0;
    }
  }

  private stateClipboard(clipboardFull: boolean): void {
    this.clipboardFull = clipboardFull;
  }

  private rotate(rotate: number): void {
    if (this.angle < rotate) {
      this.shortcutsService.changeRotation(-150);
      this.angle = rotate;
    } else {
      this.shortcutsService.changeRotation(150);
      this.angle = rotate;
    }
  }

  setRotation(rotation: string): void {
    this.angle = 0;
    this.shortcutsService.setChoosenRotation(rotation);
    this.stateRotationButton();
  }

  setMagnetism(): void {
    this.selectionService.magneticPoint = this.magneticPoint;
  }
}
