export default async function(url = '', m = 'POST', data = null) {
    const opt = {
        method: m,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data !== null) {
        opt.body = JSON.stringify(data);
    }

    const response = await fetch(url, opt);
    return response.json();
}
