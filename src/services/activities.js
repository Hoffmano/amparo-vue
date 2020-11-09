import { http } from "./config.js";

export default {
	get_activities: filters => {
		let params = {};

		if (filters.cpf_filter != "") {
			params = {...params,cpf_filter: filters.cpf_filter };
		}
		if (filters.status_filter != "") {
			params = { ...params, status_filter: filters.status_filter };
		}
		if (filters.date_filter != "") {
			params = { ...params, date_filter: filters.date_filter };
        }
        
        console.log({params})
		return http.get("filter-activities", {
			params: params
		});
	},
	post_activity: activity => {
		return http.post("new-activity", {
			cpf: activity.cpf,
			date: activity.date,
			description: activity.description,
			status: activity.status
		});
	}
};
