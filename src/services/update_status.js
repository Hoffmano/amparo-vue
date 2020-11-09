import { http } from "./config.js";

export default {
	update_status: patient => {
		return http.post("update-activity", {
            id: patient.id,
            status: patient.status
		});
	}
};
