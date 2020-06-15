import { UnionType } from './enumerators/union-type';
import { Point } from './point';

export class Union {
    unionType : UnionType;
    start : Point;
    end : Point;
    connectPoint : Point;
}