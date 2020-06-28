import {uuidGenerator} from "../../assets/js/HelperFunctions";

class GridItem {

    constructor(x = 0, y = 0, w = 6, h = 6, minW = 4, maxW = Infinity, 
        minH = 5, maxH = 12, dragIgnoreFrom = 'rect') {

        this.x =  x;
        this.y =  y;
        this.w =  w;
        this.h =  h;
        this.i =  uuidGenerator();
        this.minW =  minW;
        this.maxW =  maxW;
        this.minH =  minH;
        this.maxH =  maxH;
        this.dragIgnoreFrom =  dragIgnoreFrom;
         
    }

}

export {GridItem};