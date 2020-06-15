import { Point } from './point';
import { MateNode } from './mate-node';

export class Node {
    nodeId : number;
    nodeType : number;
    personId : string;
    parentNodeId : number;
    level : number;
    personGender : number;
    position : Point;
    mates : MateNode[];
}