import { SelectComponent } from './../select/select.component';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommandService } from '../../service/command.service';
import { ConstructionService } from '../../service/construction.service';
import { Subscription, filter } from 'rxjs';
import { IConstruction } from '../../interface/construction.interface';
import { IGeometry } from '../../interface/geometry.interface';
import { TranslatePipe } from '../../pipe/translate.pipe';

@Component({
  selector: 'app-shape-select',
  standalone: true,
  imports: [SelectComponent, TranslatePipe],
  templateUrl: './shape-select.component.html',
  styleUrl: './shape-select.component.scss'
})
export class ShapeSelectComponent {
  ALL_SHAPES = [{ id: "I", label: 'I-shape', selected: true, img: '/line.png' },
  { id: "L", label: 'L-shape', selected: false, img: '/l-shape.png' },
  { id: "S", label: 'Square-shape', selected: false, img: '/square.png' }];

  shapes = this.ALL_SHAPES.concat();

  constructionService = inject(ConstructionService);
  commandService = inject(CommandService);
  cd = inject(ChangeDetectorRef)
  constructionToEdit: IConstruction;
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(this.constructionService.unit$.pipe(filter(unit => !!unit)).subscribe(unit => {
      this.constructionToEdit = unit;
      this.shapes = this.ALL_SHAPES.concat();
      if (unit.constructionType.includes('FENCE')) {
        this.shapes = this.shapes.filter(sh => sh.id !== 'L');
      }
      const currentShape = this.constructionToEdit.geometri.shape;
      this.shapes.forEach(sh => {
        sh.selected = sh.id === currentShape;
      })
      this.cd.detectChanges();
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  refreshShape(value: any) {
    this.shapes.forEach(t => t.selected = t.id === value);
    this.constructionToEdit.geometri.shape = value;
    this.refreshGeometry(this.constructionToEdit.geometri);
  }

  refreshGeometry(geom: IGeometry) {
    geom.updateShape(geom.shape);

    this.commandService.parse(`MODIFY|shape|${geom.shape}`);

    const unit: IConstruction | undefined = this.constructionService.getUnit();
    this.constructionToEdit = unit;
  }
}
