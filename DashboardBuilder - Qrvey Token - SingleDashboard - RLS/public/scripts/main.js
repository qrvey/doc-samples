import { dashboardServices } from './services.js';
import { templates } from './templates.js';

//App global vars
let mainApp,
    dashboardContainer,
    userInfo,
    loading = false;

//Qrvey Dashboards for testing. Here you want to put your dashboards ids so they can be listed on a dropdown
const qDashboards = [
    { "name": "Sample Dashboard A", "id": "" }, 
    { "name": "Sample Dashboard B", "id": "" }
];

const baseConfig = {
    "domain": "" //Your Qrvey Instance URL without the last /. i.e https://demo.qrvey.com
}


function startApp() {
    showDashboard();
}

function showDashboard() {
    mainApp.innerHTML = templates.dashboard(qDashboards);
    userInfo = mainApp.querySelector(".user-info");
    dashboardContainer = mainApp.querySelector(".widget-container");

    userInfo.querySelector(".user-pic").innerHTML = "Demo User";

    mainApp.querySelector("#dashboards-selection").addEventListener("change", (el) => {
        if (el.target.value == '') return;
        showDashboardWidget(el.target.value);
    });
}

function showDashboardWidget(value) {

    if(loading) return;
    dashboardContainer.innerHTML = `<span class="loading-widget">Loading...</span>`;
    loading = true;
    
    // dashboardID could also be encrypted within the Qrvey token
    // let body = {
    //     dashboardid : value
    // }

    let body = {}; //In case tou want to encrypt the dashboardID, please, comment this line

    dashboardServices.getQrveyToken(body, (res) => {
        window['dashboardConfig'] = {
            "domain": baseConfig.domain,
            "qv_token": res.token,
            "dashboard_id": value //It could also be outside the Qrvey Token in case you want to reuse the Qrvey token for other dashboards
        }

        dashboardContainer.querySelector("qrvey-end-user") && widget_container.querySelector("qrvey-end-user").remove();
        let dashboard_element = document.createElement("qrvey-end-user");
        dashboard_element.setAttribute("settings", "dashboardConfig")
        dashboardContainer.append(dashboard_element);
        dashboardContainer.querySelector(".loading-widget").remove();
        loading = false;

    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    mainApp = document.querySelector("#main-app");
    startApp();
})