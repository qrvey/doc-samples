export const templates = {
    topHeader: function(dashboards){
        let options = '<option value="">Select a Dashboard</option>';
        dashboards.forEach(element => {
            options+= `<option value="${element.id}">${element.name}</option>`;
        });

        return `<div class="top-header">
            <div class="options">
                <select id="dashboards-selection">${options}</select>
            </div>
            <div class="user-info">
                <span class="user-pic">Demo User</span>
            </div>
        </div>`;
    },
    widgetContainer: function(){
        return `<div class="widget-container"></div>`;
    },
    dashboard: function(dashboards){
        return this.topHeader(dashboards) + this.widgetContainer();
    }
};