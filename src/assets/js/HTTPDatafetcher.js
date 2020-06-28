import {XmlToJson} from "../../assets/js/XmlToJson.es6";

class HTTPDatafetcher {

    constructor (dataSource, policy, interval) {
        this.dataSource = dataSource;
        this.policy = policy;
        this.interval = interval
    }

    async fetch () {
        
        const urlsArray = this.dataSource.urls.split("\n");
        let jsonData = [];
        
        for (let i = 0; i < urlsArray.length; i++) {
                
            // const response = await fetch(urlsArray[i], {
            //     method: 'GET',
            //     headers: this.dataSource.header,
            //     mode: 'cors',
            //     cache: 'default',
            // });
            const response = await fetch(urlsArray[i])
            const value = await response.text();

            if (this.dataSource.type.toLowerCase() == 'json') {
                
                try {
                    jsonData.push(JSON.parse(value));
                }
                catch(err) {
                    console.log(err);
                }

            }
            else if (this.dataSource.type.toLowerCase() == 'xml') {

                try {
                    jsonData.push(new XmlToJson().parse(value));
                }
                catch(err) {
                    console.log(err);
                }

            }
            else if (this.dataSource.type.toLowerCase() == "csv") {
                
                const csv=require('csvtojson')

                await csv().fromString(value).then((jsonObj)=>{
                    jsonData.push(jsonObj);
                })

            }
        }  

        return jsonData;
    }

}

export {HTTPDatafetcher}