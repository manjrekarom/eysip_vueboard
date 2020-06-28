import {XmlToJson} from "./XmlToJson.es6";


async function fileFetcher(file) {
    
    return new Promise((resolve, reject) => {

        let fileReader = new FileReader();
        let jsonDataArray = [];

        fileReader.readAsText(file); 
        
        fileReader.onload = () => { 
            console.log('called');
            if (file.type == 'application/json') {
                jsonDataArray.push(JSON.parse(fileReader.result));
                resolve(jsonDataArray);
            }
            else if (file.type == 'text/xml') {
                jsonDataArray.push(new XmlToJson().parse(fileReader.result));
                resolve(jsonDataArray);
            }   
            else if (file.type == 'application/vnd.ms-excel') {
                require('csvtojson').csv()
                .fromString(fileReader.result)
                .then((jsonObj)=>{ 
                    jsonDataArray.push(jsonObj);
                    resolve(jsonDataArray);
                })
            }  

            fileReader.onerror = reject;
    
        }   

    })
}


export {fileFetcher}