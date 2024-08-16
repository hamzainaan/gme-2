import { Market, Config } from "../localization/MarketConfig.js";

const ExtractIdFromHref = 
async (item) => 
{
    const is_match = item.match(Config[Market].OldPageQuestionRegex);
    return is_match && is_match.length > 1 ? is_match[1] : null;
};

const GetCheckedQuestions = 
async () => 
{
    return Array.from(document.querySelectorAll('input[id="lItems"]:checked'));
};

export const ListCheckedQuestions = 
async () => 
{
    const checked_items = await GetCheckedQuestions();

    const id_list = await Promise.all(
        checked_items.map(async item => {
            return await ExtractIdFromHref(item.nextElementSibling.getAttribute("href"));
        })
    );

    return id_list.filter(id => id !== null);
};