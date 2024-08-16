import { HasConfirmPerms } from "../misc/GetPerms.js";
import { CreateElement } from "../misc/CreateElement.js";
import { FilterButtonsDueToPage } from "../misc/PageDiag.js";
import { Market, Config } from "../localization/MarketConfig.js";
import { ListCheckedQuestions } from "../misc/PrepareCheckbox.js";
import { GetSpecificPageResponsesForCurrentUser } from "../api/routes/Users.js";
import { DeleteQuestion, DeleteResponse, MarkAsConfirmed, SendEditRequest, MarkAsFlagged } from "../api/routes/Contents.js";

const SelectAllCheckboxes = 
(event) => 
{
    if (event.target.matches('#sCheckbox')) 
    {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = event.target.checked);
    }
};


const PrepareModeration = 
async (for_response_page, check_confirmed, action) =>
{
    let give_warn = false;

    if(!check_confirmed)
    {
        give_warn = confirm(Config[Market].GiveWarningText);
    }

    const confirm_action = confirm(Config[Market].ConfirmActionText);

    if (!confirm_action) 
    {
        alert(Config[Market].ProcessCancelled);
        return;
    }; //cancelled

    //get checked items
    const items = await ListCheckedQuestions();

    if(items.length < 1) 
    {  
        alert(Config[Market].NoItemsSelected);
        return;
    } //there is no checked items, cancelled.

    if(for_response_page)
    {
        const current_user_id = window.location.href.match(/\/user_content\/(\d+)/)?.[1];
        const current_page = window.location.href.includes("/responses/") ? Math.floor((parseInt(window.location.href.match(/\/(\d+)\/0$/)[1]) - 1) / 4) + 1 : window.location.href.includes("/responses") ? 1 : 0;

        const responses = await GetSpecificPageResponsesForCurrentUser(current_user_id, current_page);

        for(const response of responses.data)
        {
            if(items.includes(response.question_id.toString()) && (check_confirmed ? !response.is_confirmed : 1))
            {
                await action(response.id, give_warn);
            }
        }

        return setTimeout(() => { location.reload() }, 1);
    }

    for(const task of items)
    {
        await action(task, give_warn);
    }
    
    return setTimeout(() => { location.reload() }, 1);
}

const Menu =
async (confirm_permission) =>
{
    //first, create menu and main checkbox to select all checkboxes
    const menu = 
    CreateElement("div", {
        id: "tMenu",
        style: "position:fixed;top:0;left:0;width:auto;height:55px;background-color:white;display:flex;align-items:center;justify-content:space-around;z-index:9999;transition:opacity 0.3s ease-in-out;opacity:1;"
    });

    const main_checkbox = 
    CreateElement("input", {
        type: "checkbox",
        style: "margin-left:10px;",
        id: "sCheckbox",
        eventListeners:
        {
            click: SelectAllCheckboxes
        }
    });

    //create buttons then
    const buttons = [
        //for task page
        CreateElement("button", {
            textContent: `🗑️ ${Config[Market].DeleteButtonText}`,
            style: "margin-left:10px; font-family: Verdana, sans-serif; font-size: 13px; padding: 10px 20px; border: 2px solid #fc0303; color: #fc0303; background-color: transparent; cursor: pointer; transition: all 0.3s ease; outline: none; border-radius: 5px; display: inline-block; text-decoration: none;",
            id: "dTButton",
            eventListeners:
            {
                click: async () => await PrepareModeration(0, 0, DeleteQuestion)
            }
        }),
        //for response page
        CreateElement("button", {
            textContent: `🗑️ ${Config[Market].DeleteButtonText}`,
            style: "margin-left:10px; font-family: Verdana, sans-serif; font-size: 13px; padding: 10px 20px; border: 2px solid #fc0303; color: #fc0303; background-color: transparent; cursor: pointer; transition: all 0.3s ease; outline: none; border-radius: 5px; display: inline-block; text-decoration: none;",
            id: "dRButton",
            eventListeners:
            {
                click: async () => await PrepareModeration(1, 0, DeleteResponse)
            }
        }),
        CreateElement("button", {
            textContent: `✔️ ${Config[Market].ApproveButtonText}`,
            style: "margin-left:10px; font-family: Verdana, sans-serif; font-size: 13px; padding: 10px 20px; border: 2px solid #4CAF50; color: #4CAF50; background-color: transparent; cursor: pointer; transition: all 0.3s ease; outline: none; border-radius: 5px; display: inline-block; text-decoration: none;",
            id: "aAButton",
            eventListeners:
            {
                click: async () => await PrepareModeration(1, 1, MarkAsConfirmed)
            }
        }),
        CreateElement("button", {
            textContent: `✒️ ${Config[Market].EditButtonText}`,
            style: "margin-left:10px; font-family: Verdana, sans-serif; font-size: 13px; padding: 10px 20px; border: 2px solid #1c3db8; color: #1c3db8; background-color: transparent; cursor: pointer; transition: all 0.3s ease; outline: none; border-radius: 5px; display: inline-block; text-decoration: none;",
            id: "eAButton",
            eventListeners:
            {
                click: async () => await PrepareModeration(1, 1, SendEditRequest)
            }
        }),
        CreateElement("button", {
            textContent: `🚩 ${Config[Market].FlagButtonText}`,
            style: "margin-left:10px; font-family: Verdana, sans-serif; font-size: 13px; padding: 10px 20px; border: 2px solid #e08104; color: #e08104; background-color: transparent; cursor: pointer; transition: all 0.3s ease; outline: none; border-radius: 5px; display: inline-block; text-decoration: none;",
            id: "rAButton",
            eventListeners:
            {
                click: async () => await PrepareModeration(1, 1, MarkAsFlagged)
            }
        })
    ];

    //prepare menu
    menu.append(main_checkbox, ...await FilterButtonsDueToPage(buttons, confirm_permission));

    //prepare checkboxes
    document.querySelectorAll('a[href^="/gorev/"]')
    .forEach(async link => {
        if (link.parentNode.tagName === 'TD') {

            //TODO: implement in the more beautiful way
            /*
            const questionId = link.href.match(/\d+/)[0];
            const data = await GetQuestionDetailsForCurrentUser(await GetUserIDByLink(Config[Market].UserContentIDRegex), questionId);
    
            const isResponsePage = Config[Market].ResponsePageRegex.test(window.location.href);
            const isTaskPage = Config[Market].TaskPageRegex.test(window.location.href);
    
            if (isResponsePage) 
            {

                if (data.reported && !data.confirmed) 
                {
                    link.style.color = "red";
                } else if (!data.reported && data.confirmed) 
                {
                    link.style.color = "green";
                } else 
                {
                    link.style.color = "";
                }

            } else if (isTaskPage) 
            {
                link.style.color = data.qReported ? "red" : "";
            } else 
            {
                link.style.color = "";
            }
            */
    
            link.parentNode.insertBefore(CreateElement("input", { type: "checkbox", id: "lItems" }), link);
        }
    });
    
    //push
    document.body.insertBefore(menu, document.body.firstChild);
    return;
}

export const InitUserContentPage = 
async () => 
{
    //too complicated :)
    if(!Config[Market].CommentPageRegex.test(window.location.href) && (Config[Market].TaskPageRegex.test(window.location.href) || Config[Market].ResponsePageRegex.test(window.location.href)))
    {
        await Menu(await HasConfirmPerms()[0]);
    }
};