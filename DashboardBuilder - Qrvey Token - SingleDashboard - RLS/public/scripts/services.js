export const dashboardServices = {
    getQrveyToken: function(body, callback){
        const GENERATE_URL = `api/generate-qrvey-token`;

        const req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (this.readyState == 4) {
                let res;
                switch (this.status) {
                    case 200:
                        res = JSON.parse(req.responseText);
                        break;
                    case 401:
                        res = JSON.parse(req.responseText);
                        res.error = true;
                        break;
                
                    default:
                        break;
                }
                callback(res);
            }
        };

        req.open("POST", GENERATE_URL);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(body));
    }
}