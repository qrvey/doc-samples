import { dashboardServices } from './services.js';
import { templates } from './templates.js';

//App global vars
let mainApp,
    dashboardContainer,
    userInfo,
    loading = false;

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

    dashboardServices.getQrveyToken({}, (res) => {
        window['dashboardConfig'] = {
            "domain": baseConfig.domain,
            "qv_token": res.token
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