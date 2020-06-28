import {uuidGenerator} from "../../assets/js/HelperFunctions";

class Datasource {

    constructor(name, type, urls, header) {

        this.id = uuidGenerator();
        this.name = name;
        this.type = type;
        this.urls = urls;
        this.header = header;
        this.jsonDataArray = [];
        
    }

}

export {Datasource};