import { http } from "./config.js";

export default {
	filter_activities: async filters => {
		try {
			console.log("filters");
			console.log(filters);
			return await http.get("filter-activities", {
				params: {
					cpf_filter: filters.cpf_filter
				}
			});
		} catch {
			error => console.lo(error);
		}
	}
};
