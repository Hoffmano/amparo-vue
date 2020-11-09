import { http } from './config.js'

export default {
    new_patient: (patient) => {
        return http.post("new-patient", {
            name: patient.name,
            cpf: patient.cpf
        })
    },
    cpf_exist: (patient) => {
        return http.get("cpf-exist", {
            params: {
                cpf: patient.cpf
            }
        })
    },
    get_autocomplete_options: (patient) => {
        return http.get("get-autocomplete")
    }
}