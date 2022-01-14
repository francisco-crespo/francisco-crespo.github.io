;(function() {
    window.handleSubmit = function() {
        let raw = document.forms[0].input.value
        if (!raw) {
            return false
        }
        let input = JSON.parse(raw)
        document.forms[0].input.value = JSON.stringify(input, null, 4)

        var headers = new Headers()
        headers.append('Authorization', `Bearer ${input.access_token}`)
        headers.append('Accept', 'application/json')
        let request = {
            method: 'GET',
            headers,
        }
        fetch('https://auth.govx.com/api/data', request)
            .then(function(res) {
                if (res.status == 200) {
                    return res.json()
                } else {
                    return null
                }
            })
            .then(function(data) {
                let output = data ? JSON.stringify(data, null, 4) : ''
                document.forms[0].output.value = output
            })

        return false
    }
})()
