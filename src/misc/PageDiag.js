import { Market, Config } from "../localization/MarketConfig.js";

export const FilterButtonsDueToPage =
async (buttons, confirm_permission) =>
{
    //tasks page
    if(Config[Market].TaskPageRegex.test(window.location.href))
    {
        buttons = buttons.filter(button => button.id !== 'dRButton' && button.id !== 'aAButton' && button.id !== 'eAButton');
    }

    //response page
    else if(Config[Market].ResponsePageRegex.test(window.location.href))
    {
        buttons = buttons.filter(button => button.id !== 'dTButton');

        //has confirm permission?
        if(confirm_permission)
        {
            buttons = buttons.filter(button => button.id !== 'aAButton');
        }
    }

    return buttons;
}