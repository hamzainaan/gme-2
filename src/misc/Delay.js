//sleep until {ms} ms
export const Delay = 
async (ms) => 
{
    await new Promise(resolve => setTimeout(resolve, ms));
}