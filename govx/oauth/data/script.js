;(function() {
    window.handleSubmit = function() {
        let raw = document.forms[0].input.value
        if (!raw) {
            return false
        }
        let input = JSON.parse(raw)
        document.forms[0].input.value = JSON.stringify(input, null, 4)

        let headers = new Headers()
        headers.append('Authorization', `Bearer ${input.access_token}`)
        headers.append('Accept', 'application/json')
        let request = {
            method: 'GET',
            headers,
        }
        fetch('https://auth.govx.com/api/data', request)
            .then(function(response) {
                if (response.status == 200) {
                    document.forms[0].output.value = JSON.stringify(response.json(), null, 4)
                }
            })
        
        return false
    }
})()
