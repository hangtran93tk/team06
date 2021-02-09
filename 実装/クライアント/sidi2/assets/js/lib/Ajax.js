export default async function(url = '', m = 'POST',  h = null, data = null, options) {
    // console.log('>>>>>',options)
    const opt ={
        method: m,
        contentType: 'application/json',
        ...options
    };
    // console.log('>>>>>',opt)
    if (opt.contentType === 'application/json') {
        if(h !== null) {
            opt.headers = {
                
                'Content-Type': 'application/json',
                'Authorization': `JWT ` + localStorage.getItem('access'),
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
    if (opt.contentType === 'multipart/form-data') {
        // console.log('here', opt)
        const response = await fetch(url, {
            method: opt.method,
            'Content-Type': opt.contentType,
            body: data
        });
         return response.json();
    }
    
}
