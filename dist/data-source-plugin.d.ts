import * as THREE from 'three';
import { WglUtil } from './wgl-util';
import { ITimelinePlugin } from './i-timeline-plugin';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { Iv3dDataSource } from './models/iv-3d-data-source';
import { Iv3dObjectHandler } from './iv-3d-object-handler';
export declare class DataSourcePlugin implements ITimelinePlugin {
    private dataSource;
    private objHandler;
    private demo;
    private isPublic;
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;
    constructor(dataSource: Iv3dDataSource, objHandler: Iv3dObjectHandler, demo: boolean, isPublic: boolean);
    init(): void;
    load(): void;
    update(time?: number): void;
    private loadDataSource();
    private bindDataToSphere(data, key, minN?, maxN?);
    private bindDataToCube(data, key, minN?, maxN?);
    private bindDataToTorus(data, key, minN?, maxN?);
    private bindDataToTorusKnot(data, key, minN?, maxN?);
    private bindDataToCylinder(data, key, minN?, maxN?);
    private bindDataToParticles(data, key, minN?, maxN?);
    private scaleValue(value, minN?, maxN?);
    private interpolate(x, minN, maxN);
    private uninterpolate(x, a, b);
    scaleValueXYZ(x: number, minN: number, maxN: number): number;
    private bindDataToObject(obj, data, key);
    filterDataSourceItems(event: any): void;
    private find3dObjectById(uuid);
}
