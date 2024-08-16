//imports
import { Delay } from "../misc/Delay.js";

//url regex to validate endpoint param
const IsValidURL = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

//post json data
export const PostJSON =
async (endpoint, body, additional_headers = {}, try_again = false) =>
{
    //validate endpoint
    if(!IsValidURL.test(endpoint)) { return; }

    //send request to legacy api
    const request = await fetch(`${endpoint}`, { method: 'POST', headers: additional_headers, body: JSON.stringify(body) });

    //result?
    if(!request.ok)
    {
        //should we try again or break?
        if(try_again)
        {
            await Delay(1000);
            return await GetJSON(endpoint, additional_headers, false); //just one more try
        }
        
        //break
        console.error("API'ye istek iletilemedi.");
        return;
    }

    const response = await request.json();

    //what does backend say?
    if(!response.success)
    {
        //should we try again or break?
        if(try_again)
        {
            await Delay(1000);
            return await PostJSON(endpoint, body, additional_headers, false); //just one more try
        }
        
        //break
        console.warn("API'ye istek iletildi fakat sunucudan olumlu bir yanıt dönmedi.");
        return;
    }
    
    //return data
    return response;
}