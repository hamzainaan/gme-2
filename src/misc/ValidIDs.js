export const IsValidID = 
async (num) => 
{
    return (typeof num === 'number' && num > 0 && num <= 9999999); //9999999 is enough forever.
}