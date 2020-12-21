export default async function(url = '', m = 'POST',  h = null, data = null) {
    const opt ={method: m};
    if(h !== null) {
        opt.headers = {
            
            'Content-Type': 'application/json',
            'Authorization': `JWT ` + localStorage.getItem('access')
        };
    }
    else {
        opt.headers = {
            'Content-Type': 'application/json',
            // 'Authorization': `JWT ` + localStorage.getItem('access')
        };
    }
    
    if (data !== null && m !== 'GET') {
        opt.body = JSON.stringify(data);
    }
     const response = await fetch(url, opt);
     return response.json();
}
