class WidgetMetaData {

    constructor(formObject, fetcher={}, jsonDataArray=[], gridData={}) {

        this.formObject = formObject;
        this.gridData = gridData;
        this.fetcher = fetcher;
        this.jsonDataArray = jsonDataArray; //File Only

    }

}

export {WidgetMetaData};