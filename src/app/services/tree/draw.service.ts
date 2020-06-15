import { Injectable } from '@angular/core';
import { Person } from 'src/app/model/draw/person';
import { Node } from 'src/app/model/draw/node';
import Konva from 'konva';
import { environment } from 'src/environments/environment';
import { CardFactory } from './card-factory';
import * as treePeople from 'src/assets/data/people.json';
import * as treeMap from 'src/assets/data/response.json';
import { Union } from 'src/app/model/draw/union';
import { UnionType } from 'src/app/model/draw/enumerators/union-type';

const people = treePeople.people;
const principalNode : Node = treeMap.map.nodes[0];
const unions : Union[] = treeMap.map.unions;

@Injectable()
export class DrawService {

    private treeData : Person[];
    private stage : Konva.Stage;
    private cardsLayer : Konva.Layer;
    private unionsLayer : Konva.Layer;
    private cardsGroup : Konva.Group;
    private unionsGroup : Konva.Group;

    public drawTree() {
        this.treeData = this.getTreeData();
        this.stage  = this.getStage();
        this.cardsLayer = new Konva.Layer( { name: 'CardsLayer' } );
        this.cardsGroup = new Konva.Group( { name: 'CardsGroup' });

        this.unionsLayer = new Konva.Layer( { name: 'UnionLayer' } );
        this.unionsGroup = new Konva.Group( { name: 'UnionGroup' });

        // this.processBlock(masterBlock);
        this.processNode(principalNode);
        this.processUnions();

        this.unionsLayer.add(this.unionsGroup);
        this.cardsLayer.add(this.cardsGroup);

        this.stage.add(this.unionsLayer);
        this.stage.add(this.cardsLayer);

        this.stage.setDraggable(true);
        this.stage.container().style.cursor = 'grab';
        this.stage.container().style.backgroundColor = '#CAD8E6';

        //  Events
        this.stage.on('wheel', this.onMouseWheel.bind(this));
        this.stage.on('mousedown', this.onStageMouseDown.bind(this));
        this.stage.on('mouseup', this.onStageMouseUp.bind(this));

        setTimeout(() => {
            this.cardsLayer.draw();
          }, 500);
    }

    processUnions() {
        unions.forEach(union => {

            if ( union.unionType === UnionType.MateUnion){

                let l1 = (Math.abs(union.end.x - union.start.x) / 2 ) - 10;

                const line1 = new Konva.Line({
                    points: [union.start.x, union.start.y, union.start.x + l1, union.end.y],
                    stroke: '#829394', strokeWidth: 1, lineCap: 'round', lineJoin: 'round',
                  });

                const line2 = new Konva.Line({
                    points: [union.end.x - l1, union.start.y, union.end.x, union.end.y],
                    stroke: '#829394', strokeWidth: 1, lineCap: 'round', lineJoin: 'round',
                  });

                const arc1 = new Konva.Arc({
                    x: union.start.x + 15, y: union.start.y + 10,
                    innerRadius: 10,  outerRadius: 10, angle: 90, rotation: 270,
                    stroke: '#829394', strokeWidth: 1,
                  });

                const arc2 = new Konva.Arc({
                    x: union.end.x - 15, y: union.end.y + 10,
                    innerRadius: 10,  outerRadius: 10, angle: 90, rotation: 180,
                    stroke: '#829394', strokeWidth: 1,
                  });

                this.unionsGroup.add(line1);
                this.unionsGroup.add(line2);
                this.unionsGroup.add(arc1);
                this.unionsGroup.add(arc2);
            }
            else {
                const points = [
                    union.start.x, union.start.y + 10,
                    union.start.x, union.start.y + 90,
                    union.end.x, union.start.y + 90,
                    union.end.x, union.end.y];

                const line1 = new Konva.Line({
                    points, stroke: '#829394', strokeWidth: 1, lineCap: 'round', lineJoin: 'round',
                    });

                this.unionsGroup.add(line1);
            }

            // const line = new Konva.Line({
            //     points, stroke: 'green', strokeWidth: 1
            //   });

            // this.cardsGroup.add(line);
        });
    }

    private processNode = ( node : Node) => {
        let person  = this.treeData.find(p => p.id === node.personId);
        if(person) this.addPersonToGroup(person, node);

        node.mates.forEach(mate => {
            person  = this.treeData.find(p => p.id === mate.personId);
            if(person) this.addPersonToGroup(person, mate);

            if(mate.hasChilds)
                mate.children.forEach(child => this.processNode(child) );
        });
    }

    private onStageMouseDown = (event : Konva.KonvaEventObject<MouseEvent>) =>
        this.stage.container().style.cursor = 'grabbing'

    private onStageMouseUp = (event : Konva.KonvaEventObject<MouseEvent>) =>
        this.stage.container().style.cursor = 'grab'

    private addPersonToGroup = (person : Person, node : any) => {
        const card : Konva.Group = CardFactory.drawCard(person);

        card.attrs = {x : node.position.x, y: node.position.y ,  name: `Card:${ person.id }` };
        card.on('mouseover', this.onMouseOver.bind(this));
        card.on('mouseout', this.onMouseOut.bind(this));
        this.cardsGroup.add(card);
    }

    private getTreeData = () : Person[] => {
        const tree : Person[] = [];

        people.forEach(p => {
            tree.push({
                id: p.id,
                name: p.name,
                firstFamilyName: p.firstFamilyName,
                secondFamilyName: p.secondFamilyName,
                isAlive: p.isAlive,
                bornDate: new Date(p.bornDate),
                gender: p.gender,
                hasPhoto: p.hasPhoto,
                personalImage: p.personalImage
            } as Person);
        });

        return tree;
    }

    private getStage = () : Konva.Stage => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return  new Konva.Stage({
            container: environment.drawingConfiguration.containerName,
            width,
            height,
          });
      }

      private onMouseWheel = (event : any) => {
        event.evt.preventDefault();

        const oldScale = this.stage.scaleX();
        const pointer = this.stage.getPointerPosition();
        const mousePointTo = {
          x: (pointer.x - this.stage.x()) / oldScale,
          y: (pointer.y - this.stage.y()) / oldScale,
        };

        const newScale = event.evt.deltaY > 0 ? (oldScale * environment.drawingConfiguration.scaleZoom.zoomScaleby) :
                (oldScale / environment.drawingConfiguration.scaleZoom.zoomScaleby);

        if (oldScale > newScale && newScale <= environment.drawingConfiguration.scaleZoom.minScaleZoom) { return; }
        if (oldScale < newScale && newScale >= environment.drawingConfiguration.scaleZoom.maxScaleZoom) { return; }

        this.stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };

        this.stage.position(newPos);
        this.stage.batchDraw();
    }

    private onMouseOut = (event : Konva.KonvaEventObject<MouseEvent>) => {
        if (event.currentTarget) {
            const rect : Konva.Rect = event.currentTarget.children[0];
            this.stage.container().style.cursor = 'grab';

            rect.setAttrs({
                strokeWidth: environment.drawingConfiguration.cardInformation.events.onMouseOut.attrs.strokeWidth,
            });

            event.currentTarget.setAttrs({ scale: { x: 1, y: 1 }});

            this.cardsLayer.draw();
        }
    }

    private onMouseOver = (event : Konva.KonvaEventObject<MouseEvent>) => {
        if (event.currentTarget) {
            const rect : Konva.Rect = event.currentTarget.children[0];
            this.stage.container().style.cursor = 'pointer';

            rect.setAttrs({
                strokeWidth: environment.drawingConfiguration.cardInformation.events.onMouseOver.attrs.strokeWidth,
            });

            event.currentTarget.setAttrs({ scale: { x: 1.2, y: 1.2 }});
            event.currentTarget.moveToTop();

            this.cardsLayer.draw();
        }
    }
}
