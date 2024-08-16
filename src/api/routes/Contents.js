import { PostJSON } from "../POST.js";
import { Market, Config } from "../../localization/MarketConfig.js";

export const MarkAsNormal =
async (model_type, model_id) =>
{
    const body = { model_type_id: model_type, model_id: model_id }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/accept`, body, {}, true);
    return data;
}

export const DeleteQuestion =
async ( model_id, warn = false) =>
{
    const body = { model_type_id: 1, model_id: model_id, reason: "", reason_id: 56, give_warning: warn, take_points: true, return_points: false }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/delete_task_content`, body, {}, true);
    return data;
}

export const DeleteResponse =
async (model_id, warn = false) =>
{
    const body = { model_type_id: 2, model_id: model_id, reason: "", reason_id: 59, give_warning: warn, take_points: true }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/delete_response_content`, body, {}, true);
    return data;
}

export const DeleteComment =
async (model_id, warn = false) =>
{
    const body = { model_type_id: 45, model_id: model_id, reason: "", reason_id: 31, give_warning: warn }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/delete_comment_content`, body, {}, true);
    return data;
}

export const MarkAsConfirmed =
async (model_id) =>
{
    const body = { model_type_id: 2, model_id: model_id }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/api_content_quality/confirm`, body, {}, true);
    return data;
}

export const MarkAsUnconfirmed =
async (model_id) =>
{
    const body = { model_type_id: 2, model_id: model_id }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/api_content_quality/unconfirm`, body, {}, true);
    return data;
}

export const SendEditRequest =
async (model_id, reason = "") =>
{
    const body = { model_type_id: 2, model_id: model_id, reason: reason }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/wrong_report`, body, {}, true);
    return data;
}

export const SendThanksToResponse =
async (model_id) =>
{
    const data = await GetJSON(`https://${Config[Market].Host}/api/28/api_responses/thank/${model_id}`);
    return data;
}

export const MarkAsFlagged =
async (model_type_id, model_id) =>
{
    const body = { model_type_id: model_type_id, model_id: model_id, abuse: { category_id: (model_type_id == 1 ? 2 : 8), subcategory_id: (model_type_id == 1 ? 8 : 4), data: null } }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/api_moderation/abuse_report`, body, {}, true);
    return data;
}

export const ExpireTicket =
async (model_id) =>
{
    const body = { model_type_id: 1, model_id: model_id }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/api_content_quality/confirm`, body, {}, true);
    return data;
}

//Max 480, I don't want to write loops for now.
//TODO: Implement loops to get all ticekts if the count of TD is bigger than 480.
export const GetTDTickets480 =
async () =>
{
    const body = { category_id: 0, subject_id: 0 }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/index`, body, {}, true);
    return data;
}

export const GetTDComments480 =
async () =>
{
    const body = { category_id: 998, subject_id: 0 }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/get_comments_content`, body, {}, true);
    return data;
}

export const GetTDCorrections480 =
async () =>
{
    const body = { category_id: 999, subject_id: 0 }
    const data = await PostJSON(`https://${Config[Market].Host}/api/28/moderation_new/get_wrong_content`, body, {}, true);
    return data;
}