import { HasConfirmPerms } from "../misc/GetPerms.js";
import { CreateElement } from "../misc/CreateElement.js";
import { Market, Config } from "../localization/MarketConfig.js";

const Menu =
async () =>
{

    const has_confirm_perm = await HasConfirmPerms();

    const buttons = 
    [
        CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassResponseDeleteText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }),

         CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassCommentDeleteText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }),

         CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassResponseThanksText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }),

         has_confirm_perm[0] ? CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassConfirmResponseText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }) : null,

         has_confirm_perm[1] ? CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassUnconfirmResponseText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }): null,

         CreateElement('li', { 
            innerHTML: `<a>${Config[Market].MassApproveAllFlaggedResponsesText}</a>`,
            eventListeners:
            {
                click: () => {}
            }
         }),

    ].filter(button => button !== null);

    const mod_panel = document.querySelector('#profile-mod-panel > ul');
    if(!mod_panel) return;

    mod_panel.append(...buttons);
}

export const InitOldProfilePage =
async () =>
{
    await Menu();
}