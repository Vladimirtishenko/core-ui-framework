'use strict';

import './styl/core.styl'

import base from './base.js';
import ServiceLocator from './service.js'


class Core {
    constructor() {}

    serverRequest(method, url, header, data, callback){

        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        if(header){
            xhr.setRequestHeader('Content-type', header);
        }
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                callback(xhr.response, self);
            }
        }

        xhr.send(data || null);
    }

    initializeService(){
        new ServiceLocator(this);
    }


}

(new Core()).initializeService();
