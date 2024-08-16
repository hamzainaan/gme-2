//imports
import { GetHTML, GetJSON } from "../GET.js";
import { IsValidID } from "../../misc/ValidIDs.js";
import { Market, Config } from "../../localization/MarketConfig.js";

export const IsDeletedUser =
async (user_id) =>
{
    if(!IsValidID(user_id)) { return; }

    const data = await GetJSON(`https://${Config[Market].Host}/api/28/api_users/get_by_id?id=${user_id}`, {}, false);
    return data.data.is_deleted;

}

export const MyUserData =
async (background_verify) =>
{
    const data = await GetJSON(`https://${Config[Market].Host}/api/28/api_users/me`, {}, false);
    return (background_verify) ? data.success : data;

}

export const GetUserIDByLink =
async (regex) => 
{
    return (window.location.href.match(regex)?.[1]);
}

export const UserDataByID =
async (user_id) =>
{
    //is valid id?
    if(!IsValidID(user_id)) { return; }

    const data = await GetJSON(`https://${Config[Market].Host}/api/28/api_users/get_by_id?id=${user_id}`, {}, false);
    return data;

}

export const GetCommentsFromContentPage =
async (user_id, page) =>
{
    //is valid id?
    if(!IsValidID(user_id)) { return; }

    const data = await GetHTML(`https://${Config[Market].Host}/users/user_content/${user_id}/comments_tr/${page}/0`, {}, false);

    var comments = [];

    //parse raw html
    const parser = new DOMParser(); //available on browser.
    const doc = parser.parseFromString(data, 'text/html');
    
    if(doc.querySelector('.border-error.red')) { //end of the comments
        comments = Array.from(new Set(comments));
        return comments;
    }

    doc.querySelectorAll('table tbody tr').forEach(comment => { //comments
        comments.push(comment.querySelector('td:nth-child(2) a').getAttribute('href').split('/gorev/')[1]); //question id's
    });

    await GetCommentsFromContentPage(user_id, page + 1);

    return comments;

}

//TODO: implement in the more beautiful way
/*
export const GetQuestionDetailsForCurrentUser =
async (question_id, user_id) => 
{
    if(!IsValidID(question_id) || !IsValidID(user_id)) { return; }

    try
    {
        const { data: { task: { settings: { is_marked_abuse: is_question_flagged } }, responses } } = await GetJSON(`https://${Config[Market].Host}/api/28/api_tasks/main_view/${question_id}`, {}, true);
        const current_data = { is_question_flagged, is_answer_flagged: false, is_answer_confirmed: false };
        const current_user_response = responses.find(response => response.user_id == user_id);

        if(current_user_response)
        {
            const { is_marked_abuse: is_answer_flagged, is_confirmed: is_answer_confirmed } = current_user_response.settings;
            return { is_question_flagged, is_answer_flagged, is_answer_confirmed };
        }

        return current_data;
    } catch(e)
    {
        return { is_question_flagged: false, is_answer_flagged: false, is_answer_confirmed: false };
    }

}
*/

export const GetSpecificPageResponsesForCurrentUser =
async (user_id, page) => 
{
    if(!IsValidID(user_id)) { return; }

    return await GetJSON(`https://${Config[Market].Host}/api/28/api_responses/get_by_user?userId=${user_id}&page=${page}`);

}